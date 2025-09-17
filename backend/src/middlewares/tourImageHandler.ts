// middlewares/tourImageHandler.ts
import { ITour } from '@interfaces/tour.interface'
import { deleteImage, deleteImages, deleteTourImages } from '@utils/image'
import { Request } from 'express'

export const handleTourImagesOnUpdate = async (tour: ITour, req: Request) => {
  const locations = req.body.locations.map((location: string) =>
    JSON.parse(location)
  )
  let updates: Partial<ITour> = {}

  if (req.body.imageCover) {
    // Delete Old tour image Cover
    deleteImage('tours', tour.imageCover)
  }

  if (req.body.images) {
    // Delete Old tour images
    if (tour.images?.length) deleteImages('tours', tour.images)
  }

  updates = { ...req.body, locations }
  return updates
}

export const deleteTourImagesOnDelete = async (tour: ITour) => {
  const files = [tour.imageCover, ...(tour.images || [])]
  await deleteTourImages(files.filter(Boolean))
}
