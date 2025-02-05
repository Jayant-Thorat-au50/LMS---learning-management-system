const { Schema, model } = require('mongoose')

const requestsSchema = new Schema({
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status: {
        type: String,
    },
    requestedTo: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

const RequestModel = model('requests', requestsSchema)

module.exports = RequestModel;