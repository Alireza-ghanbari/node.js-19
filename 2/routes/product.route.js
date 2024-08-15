import express from "express";
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post('/', addProduct)
router.get('/', getAllProduct)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', updateProduct)


export default router;
