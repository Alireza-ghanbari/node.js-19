import express from 'express'
import { isAdmin } from '../Middleware/isAdmin.js'
import { createPost, deletePost, getAllPost, getOnePost, updatePost } from '../Controllers/PostCn.js'
const postRouter=express.Router()
postRouter.route('/').get(getAllPost).post(isAdmin,createPost)
postRouter.route('/:id').get(getOnePost).patch(isAdmin,updatePost).delete(isAdmin,deletePost)


export default postRouter