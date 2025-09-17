import { Model, Document, Query, FilterQuery } from 'mongoose'

interface APIFeaturesOptions<T> {
  searchFields?: (keyof T | string)[]
  excludeFields?: string[]
}

export class APIFeatures<T extends Document> {
  private queryObj: Record<string, unknown>
  private model: Model<T>
  public query: Query<T[], T>
  public filterQuery: FilterQuery<T> = {}
  private options: APIFeaturesOptions<T>

  constructor(
    model: Model<T>,
    queryObj: Record<string, unknown>,
    options: APIFeaturesOptions<T> = {}
  ) {
    this.model = model
    this.queryObj = queryObj
    this.options = options
    this.query = this.model.find() // Start empty
  }

  filter(baseFilter: FilterQuery<T> = {}): this {
    const rawQuery: Record<string, unknown> = { ...this.queryObj }
    const excludeFields = this.options.excludeFields || [
      'page',
      'limit',
      'sort',
      'field',
      'search'
    ]
    excludeFields.forEach((field) => delete rawQuery[field])

    // Base filtering
    let filterQuery: FilterQuery<T> = {}
    let queryStr = JSON.stringify(rawQuery)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in|ne)\b/g,
      (match) => `$${match}`
    )
    filterQuery = JSON.parse(queryStr) as FilterQuery<T>

    // Search
    if (
      this.options.searchFields &&
      typeof this.queryObj.search === 'string' &&
      this.queryObj.search.trim() !== ''
    ) {
      const regex = { $regex: this.queryObj.search, $options: 'i' as const }
      filterQuery.$or = this.options.searchFields.map((field) => ({
        [field]: regex
      })) as FilterQuery<T>['$or']
    }

    // ✅ Merge baseFilter with current filter
    this.filterQuery = { ...baseFilter, ...filterQuery }
    this.query = this.model.find(this.filterQuery)
    return this
  }

  sort(): this {
    const sortBy = this.queryObj.sort
    if (typeof sortBy === 'string') {
      const sortStr = sortBy.split(',').join(' ')
      this.query = this.query.sort(sortStr)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  limitFields(): this {
    const fields = this.queryObj.field
    if (typeof fields === 'string') {
      const fieldsStr = fields.split(',').join(' ')
      this.query = this.query.select(fieldsStr)
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  paginate(): this {
    const limit = this.queryObj.limit
      ? Math.max(Number(this.queryObj.limit), 1)
      : undefined
    const page = this.queryObj.page
      ? Math.max(Number(this.queryObj.page), 1)
      : undefined

    if (page && limit) {
      const skip = (page - 1) * limit
      this.query = this.query.skip(skip).limit(limit)
    } else if (limit) {
      this.query = this.query.limit(limit)
    }

    return this
  }
}
