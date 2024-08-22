import catchAsync from "../Utils/catchAsync.js";
import jwt from 'jsonwebtoken'
import ApiFeatures from "../Utils/apiFeatures.js";
import Post from "../Models/PostMd.js";
import fs from 'fs'
import { __dirname } from "../app.js";

export const createPost=catchAsync(async (req,res,next) => {
    const {id}=jwt.verify(req.headers?.authorization.split(' ')[1],process.env.JWT_SECRET)
    const post=await Post.create({...req.body,userId:id})
    res.status(201).json({
        status:'success',
        data:{post}
    })
})
export const getAllPost=catchAsync(async (req,res,next) => {
    const queryString={...req.query,populate:'categoryId'}
    const features=new ApiFeatures(Post,queryString).filters().sort().limitFields().paginate().populate()
    const posts=await features.query
    res.status(200).json({
        status:'success',
        data:{posts}
    })
})
export const getOnePost=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const post=await Post.findById(id).populate(['categoryId',{path:'userId',select:'fullName userName'}])
    res.status(200).json({
        status:'success',
        data:{post}
    })
})
export const updatePost=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const oldPost=await Post.findByIdAndUpdate(id,req.body,{runValidators:true})

    if(req?.body?.image && req?.body?.image !=oldPost.image){
        fs.unlinkSync(`${__dirname}/Public/${oldPost.image}`)
    }
    const post=await Post.findById(id)
    res.status(200).json({
        status:'success',
        data:{post}
    })
})
export const deletePost=catchAsync(async (req,res,next) => {
    try{
        const {id}=req.params
        const post=await Post.findByIdAndDelete(id)
        if(post.image){
            fs.unlinkSync(`${__dirname}/Public/${post.image}`)
        }
        res.status(200).json({
            status:'success',
            data:{post}
        })
    }catch(err){
        console.log(err)
    }
    
})