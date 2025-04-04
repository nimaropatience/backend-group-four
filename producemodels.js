const mongoose = require('mongoose');
const produceSchema = new mongoose.Schema({
    produceID: {
        type: String,
        required: true,
        unique: true
    },
    producename: {
        type: String,
        required: true
    },
    producedate: {
        type: Date,
        required: true
    },
    producetime: {
        type: String,
        required: true
    },
    tonnage: {
        type: Number,
        required: true,
        default: 0

    },
    cost: {
        type: Number,
        required: true
    },

    Dealername: {
        type: String,
        required: true
    },

    DealerID: {
        type: String,
        required: true,
        unique: true
    },
    Branch: {
        type: String,
        required: true
    },
    Dealercontact: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }

);
const Produce = mongoose.model('Produce', produceSchema);
module.exports = Produce;
