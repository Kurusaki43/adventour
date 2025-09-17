// services/pdfService.ts
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'
import { IBookingPopulated } from '@interfaces/booking.interface'

// Register fonts
const fontRegular = path.resolve(
  process.cwd(),
  'public/fonts/OpenSans-Regular.ttf'
)
const fontLight = path.resolve(process.cwd(), 'public/fonts/OpenSans-Light.ttf')
const fontBold = path.resolve(process.cwd(), 'public/fonts/OpenSans-Bold.ttf')

export const generateBookingReceipt = (
  booking: IBookingPopulated
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A6', margin: 25 })

    const filePath = path.resolve(
      process.cwd(),
      'public',
      'receipts',
      `receipt-${booking._id}.pdf`
    )

    const stream = fs.createWriteStream(filePath)
    doc.pipe(stream)

    // === RECEIPT BORDER ===
    const borderMargin = 10
    doc
      .lineWidth(1)
      .strokeColor('#ccc')
      .rect(
        borderMargin,
        borderMargin,
        doc.page.width - borderMargin * 2,
        doc.page.height - borderMargin * 2
      )
      .stroke()

    // === COMPANY HEADER ===
    const logoPath = path.resolve(process.cwd(), 'public', 'img', 'logo.png')
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width / 2 - 30, 25, { width: 80 })
    }
    doc.moveDown(2)

    // === COMPANY INFO ===
    doc
      .font(fontLight)
      .fontSize(8)
      .fillColor('#555')
      .text('Algiers, Algeria', { align: 'center' })
      .text('info@mytourcompany.com', { align: 'center' })
      .text('+213 555 123 456', { align: 'center' })
    doc.moveDown(1)

    // === RECEIPT TITLE ===
    doc
      .fontSize(14)
      .fillColor('#000')
      .font(fontBold)
      .text('Receipt', { align: 'center', underline: true })

    // === BOOKING DETAILS ===
    doc.moveDown(1)
    doc.fontSize(12).fillColor('#000').font(fontBold).text('Booking Details', {
      align: 'left'
    })
    doc.moveDown(1)

    // Helper for key-value pairs
    const renderDetail = (label: string, value: string) => {
      const labelWidth = 90
      const x = 30
      const y = doc.y

      doc
        .fontSize(9)
        .font(fontBold)
        .fillColor('#111')
        .text(`${label}:`, x, y, { width: labelWidth, continued: false })

      doc
        .fontSize(9)
        .font(fontLight)
        .fillColor('#333')
        .text(value, x + labelWidth + 5, y)
    }

    renderDetail('Receipt #', '0000021')
    renderDetail('Receipt date', format(new Date(), 'dd-MM-yyyy'))
    renderDetail('Customer name', booking.user.name)
    renderDetail('Customer email', booking.user.email)
    renderDetail('Tour name', booking.tour.name)
    renderDetail(
      'Tour date',
      format(new Date(booking.tourStartDate), 'MMM d, yyyy')
    )
    renderDetail('Guests', booking.peopleCount.toString())
    doc.moveDown(2)
    renderDetail('Price', `${booking.price.toFixed(2)} DA`)

    doc.moveDown(6)

    // === FOOTER ===
    const footerText =
      'Thank you for booking with us! We look forward to your next visit'

    // Calculate position near bottom (e.g. 40px from bottom)
    const footerY = doc.page.height - 40

    doc
      .font(fontRegular)
      .fontSize(8)
      .fillColor('#999')
      .text(footerText, 0, footerY, {
        align: 'center',
        width: doc.page.width
      })
    // Finalize document
    doc.end()

    // Resolve only after writing is finished
    stream.on('finish', () => resolve(filePath))
    stream.on('error', reject)
  })
}
