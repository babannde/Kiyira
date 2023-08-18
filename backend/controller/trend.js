const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Trend = require("../model/trend");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");



// create trend
router.post("/create-trend", upload.array("images"), catchAsyncErrors(async(req,res,next) => {
    try {

        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new ErrorHandler("Shop Id is invalid", 400));
        } else{
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const trendData = req.body;
            trendData.images = imageUrls;
            trendData.shop = shop;

            const trend = await Trend.create(trendData);

            res.status(201).json({
                success: true,
                trend,
            })
        }

        
    } catch (error) {
        return next(new ErrorHandler(error,400));
    }
}));

// get all trends
router.get("/get-all-trends", async(req,res,next) => {
    try {
        const trends = await Trend.find();
        res.status(201).json({
            trends,
        })
    } catch (error) {
     return next(new ErrorHandler(error, 400));   
    }
})

// get all trends of a shop

router.get(
    "/get-all-shop-trends/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const trends = await Trend.find({ shopId: req.params.id });

            res.status(201).json({
                success: true,
                trends,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// Delete trends of shop
router.delete("/delete-shop-trend/:id", catchAsyncErrors(async(req,res,next) => {
    try {
        const trendId = req.params.id;

        const trendData = await Trend.findById(trendId);

        trendData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err);
                }
            });
        });

        const trend = await Trend.findByIdAndDelete(trendId);

        if(!trend){
            return next (new ErrorHandler('Trend with this Id not found!', 500));
        }

        res.status(201).json({
            success: true,
            message: "Trend Deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// all products --- for admin
router.get(
    "/admin-all-trends",
    isAuthenticated,
    isAdmin("Admin"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const trends = await Trend.find().sort({
          createdAt: -1,
        });
        res.status(201).json({
          success: true,
          trends,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );



module.exports = router;