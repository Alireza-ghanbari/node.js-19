import catchAsync from "../Utils/catchAsync.js";
import jwt from 'jsonwebtoken'
import ApiFeatures from "../Utils/apiFeatures.js";
import Comment from "../Models/CommentMd.js";
import fs from 'fs'
import { __dirname } from "../app.js";
import HandleError from "../Utils/handleError.js";

export const createComment=catchAsync(async (req,res,next) => {
    const {id}=jwt.verify(req.headers?.authorization.split(' ')[1],process.env.JWT_SECRET)
    const comment=await Comment.create({...req.body,userId:id})
    res.status(201).json({
        status:'success',
        data:{comment}
    })
})
export const getAllComment=catchAsync(async (req,res,next) => {
    const queryString={...req.query,populate:'categoryId'}
    const features=new ApiFeatures(Comment,queryString).filters().sort().limitFields().paginate().populate()
    const comments=await features.query
    res.status(200).json({
        status:'success',
        data:{comments}
    })
})
export const getOneComment=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const comment=await Comment.findById(id).populate(['categoryId',{path:'userId',select:'fullName userName'}])
    res.status(200).json({
        status:'success',
        data:{comment}
    })
})
export const deleteComment=catchAsync(async (req,res,next) => {
    try{

        const {id}=req.params
        const {id:userId,role}=jwt.verify(req.headers?.authorization.split(' ')[1],process.env.JWT_SECRET)

        const comment=await Comment.findById(id)
        if(comment.userId!==userId && role!=='admin'){
            return next(new HandleError('گمشو بیرون',401))
        }
        await Comment.findByIdAndDelete(id)

        res.status(200).json({
            status:'success',
            data:{comment}
        })
    }catch(err){
        console.log(err)
    }
    
})