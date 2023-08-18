const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter request title!"]
    },
    description:{
        type: String,
        required: [true, "Please enter request description!"]
    },
    user:{
        type: Object,
        required: true,
    },
    shopId:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "Requested",
    },
    paymentInfo:{
        id:{
            type: String,
        },
        status:{
            type: String,
        },
        type:{
            type: String,
        },
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    completedAt:{
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Quote", quoteSchema);