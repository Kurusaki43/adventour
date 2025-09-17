import { HttpStatusCode } from '@constants/httpsStatusCode'
import { AppError } from '@utils/appError'
import { catchAsync } from '@utils/catchAsync'
import { NextFunction, Request } from 'express'
import { Document, Model } from 'mongoose'

// Create a document
export const createOne = <T extends Document>(
  Model: Model<T>,
  docName: string,
  options?: {
    onCreate?: (req: Request, next?: NextFunction) => Promise<Partial<T> | void>
  }
) =>
  catchAsync(async (req, res) => {
    {
      let body: Partial<T> = { ...req.body }
      if (options?.onCreate) {
        const extraData = await options.onCreate(req)
        if (extraData) {
          body = { ...body, ...extraData }
        }
      }

      const doc = await Model.create(body)

      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        message: `${docName} created successfully`,
        data: { [docName]: doc }
      })
    }
  })

// Delete a document
export const deleteOne = <T extends Document>(
  Model: Model<T>,
  options?: { onDelete?: (doc: T) => Promise<void> }
) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(
        new AppError('No document found with that ID', HttpStatusCode.NOT_FOUND)
      )
    }

    // optional side effect after deletion
    if (options?.onDelete) {
      await options.onDelete(doc)
    }

    res.status(HttpStatusCode.NO_CONTENT).json({
      status: 'success'
    })
  })

// Update a document
export const updateOne = <T extends Document>(
  Model: Model<T>,
  options?: {
    onUpdate?: (doc: T, req: Request) => Promise<Partial<T>> | Promise<void>
  }
) =>
  catchAsync(async (req, res, next) => {
    // 1. Find the document by ID
    const docId = req.params.id
    const doc = await Model.findById(docId)

    // 2. If no document found, return an error
    if (!doc)
      return next(
        new AppError('No document found with that ID', HttpStatusCode.NOT_FOUND)
      )

    let newData: Partial<T> = { ...req.body }

    // 3. Optional side effect before update
    if (options?.onUpdate) {
      const data = await options.onUpdate(doc, req)
      if (data) {
        newData = data
      }
    }
    const updatedDoc = await Model.findByIdAndUpdate(docId, newData, {
      new: true
    })

    // 4. Return the updated document as JSON response
    res.status(200).json({
      status: 'success',
      data: {
        document: updatedDoc
      }
    })
  })

// get a document
export const getOne = <T extends Document>(
  Model: Model<T>,
  docName: string,
  populateOptions: Parameters<typeof Model.findById>[0][] | string[] = []
) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id).select('-__v')

    // Apply population dynamically
    if (Array.isArray(populateOptions) && populateOptions.length > 0) {
      populateOptions.forEach((pop) => {
        if (typeof pop === 'string') {
          query = query.populate(pop)
        } else {
          query = query.populate(pop)
        }
      })
    }

    const doc = await query

    if (!doc) {
      return next(
        new AppError(
          `No ${docName} found with that ID`,
          HttpStatusCode.NOT_FOUND
        )
      )
    }

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      data: { [docName]: doc }
    })
  })
