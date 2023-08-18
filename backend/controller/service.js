const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Service = require("../model/service");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");



// create service
router.post("/create-service", upload.array("images"), catchAsyncErrors(async(req,res,next) => {
    try {

        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new ErrorHandler("Shop Id is invalid", 400));
        } else{
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const serviceData = req.body;
            serviceData.images = imageUrls;
            serviceData.shop = shop;

            const service = await Service.create(serviceData);

            res.status(201).json({
                success: true,
                service,
            })
        }

        
    } catch (error) {
        return next(new ErrorHandler(error,400));
    }
}));

// get all services of a shop

router.get(
    "/get-all-shop-services/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const services = await Service.find({ shopId: req.params.id });

            res.status(201).json({
                success: true,
                services,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// Delete services of shop
router.delete("/delete-shop-service/:id",isSeller, catchAsyncErrors(async(req,res,next) => {
    try {
        const serviceId = req.params.id;

        const serviceData = await Service.findById(serviceId);

        serviceData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err);
                }
            });
        });

        const service = await Service.findByIdAndDelete(serviceId);

        if(!service){
            return next (new ErrorHandler('Service with this Id not found!', 500));
        }

        res.status(201).json({
            success: true,
            message: "Service deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// get all services
router.get(
    "/get-all-services",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const services = await Service.find().sort({ createdAt: -1 });
  
        res.status(201).json({
          success: true,
          services,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

    // review for a services
// router.put(
//     "/create-new-review",
//     isAuthenticated,
//     catchAsyncErrors(async (req, res, next) => {
//       try {
//         const { user, rating, comment, productId, orderId } = req.body;
  
//         const product = await Product.findById(productId);
  
//         const review = {
//           user,
//           rating,
//           comment,
//           productId,
//         };
  
//         const isReviewed = product.reviews.find(
//           (rev) => rev.user._id === req.user._id
//         );
  
//         if (isReviewed) {
//           product.reviews.forEach((rev) => {
//             if (rev.user._id === req.user._id) {
//               (rev.rating = rating), (rev.comment = comment), (rev.user = user);
//             }
//           });
//         } else {
//           product.reviews.push(review);
//         }
  
//         let avg = 0;
  
//         product.reviews.forEach((rev) => {
//           avg += rev.rating;
//         });
  
//         product.ratings = avg / product.reviews.length;
  
//         await product.save({ validateBeforeSave: false });
  
//         await Order.findByIdAndUpdate(
//           orderId,
//           { $set: { "cart.$[elem].isReviewed": true } },
//           { arrayFilters: [{ "elem._id": productId }], new: true }
//         );
  
//         res.status(200).json({
//           success: true,
//           message: "Reviwed succesfully!",
//         });
//       } catch (error) {
//         return next(new ErrorHandler(error, 400));
//       }
//     })
//   );
  
  // all service --- for admin
  router.get(
    "/admin-all-services",
    isAuthenticated,
    isAdmin("Admin"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const services = await Service.find().sort({
          createdAt: -1,
        });
        res.status(201).json({
          success: true,
          services,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );


module.exports = router;