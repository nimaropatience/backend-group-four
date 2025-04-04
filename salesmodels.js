const mongoose = require('mongoose');
const salesSchema = new mongoose.Schema({
    salesID: {
        type: String,
        required: true,
        unique: true
    },
    producename: {
        type: String,
        required: true
    },
    
    tonnage: {
        type: Number,
        required: true,
        default: 0

    },
    amountpaid: {
        type: Number,
        required: true
    },

    buyersname: {
        type: String,
        required: true
    },

    Sales: {
        type: String,
        required: true,
        unique: true
    },
    Agentname: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }

);
const Sales = mongoose.model('Sales', produceSchema);
module.exports = Sa;