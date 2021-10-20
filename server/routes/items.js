import express from "express";
import serviceController from "../controllers/serviceController.js";

const router = express.Router();
router.get('/items', serviceController.getListOfProducts, serviceController.handleListOfProductsResponse);
router.get('/items/:id', serviceController.getInfoFromProduct, serviceController.handleProductResponse);

export default router;