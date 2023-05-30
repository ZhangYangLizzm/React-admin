import express from 'express'
import { getFilesHandler, uploadFilesHandler } from '../routerHandler/filesCloudHandler'

const router=express.Router()

router.get('/getFiles',getFilesHandler)

router.post('/uploadFiles',uploadFilesHandler)

export default router

