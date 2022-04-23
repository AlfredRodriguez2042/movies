import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (_req: any, file: any, next: any) => {
    next(null, 'movies' + path.extname(file.originalname))
  },
})

export default multer({ storage })
