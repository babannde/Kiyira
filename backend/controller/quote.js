const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Quote = require("../model/quote");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const fs = require("fs");


// create product
router.post("/create-quote", upload.array("images"), catchAsyncErrors(async(req,res,next) => {
  try {

      const shopId = req.body.shopId;
      const userId = req.body.userId;
      const shop = await Shop.findById(shopId);
      if(!shop){
          return next(new ErrorHandler("Shop Id is invalid", 400));
      } else{
          const files = req.files;
          const imageUrls = files.map((file) => `${file.filename}`);
          const quoteData = req.body;
          quoteData.images = imageUrls;

          const quote = await Quote.create(quoteData);

          res.status(201).json({
              success: true,
              quote,
          })
      }

      
  } catch (error) {
      return next(new ErrorHandler(error,400));
  }
}));

module.exports = router;