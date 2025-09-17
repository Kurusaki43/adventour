import { logger } from '@config/logger'
import fs from 'fs'
import path from 'path'

/**
 * Delete multiple tour images from /public/uploads/tours
 * @param filenames - Array of tour image filenames (e.g., ['tour-abc.jpg'])
 */
export const deleteTourImages = async (filenames: string[]) => {
  if (!filenames || filenames.length === 0) return

  const basePath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    'tours'
  ) // fixed here ✅

  await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(basePath, filename)
      try {
        await fs.promises.access(filePath)
        await fs.promises.unlink(filePath)
        logger.info(`✅ Deleted: ${filename}`)
      } catch (err: unknown) {
        if (err instanceof Error) {
          logger.error(err.message, `❌ Error deleting ${filename}:`)
        } else {
          logger.error('Unknown error', `❌ Error deleting ${filename}:`)
        }
      }
    })
  )
}

export const deleteImage = (folder: string, filename: string) => {
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    folder,
    filename
  )
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}

export const deleteImages = (folder: string, filenames: string[]) => {
  filenames.forEach((filename) => deleteImage(folder, filename))
}
