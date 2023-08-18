const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter trend product or service name!"]
    },
    description:{
        type: String,
        required: [true, "Please enter trend description!"]
    },
    category:{
        type: String,
        required: [true, "Please enter your trend category!"]
    },
    start_Date: {
        type: Date,
        required: true,
    },
    finish_Date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: "Running",
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required: [true, "Please enter your product price!"]
    },
    stock:{
        type: Number,
    },
    images:[
        {
            type: String,
        },
    ],
    reviews:[
        {
            user: {
                type: Object,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
            productId: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }
        },
    ],
    ratings:{
        type: Number,
    },
    shopId:{
        type: String,
        required: true,
    },
    shop:{
        type: Object,
        required: true,
    },
    sold_out:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Trend", trendSchema);