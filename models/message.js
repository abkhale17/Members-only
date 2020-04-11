var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var MessageSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User', required:true},
    timestamp: {
        type: String, 
        default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
  }
);


module.exports = mongoose.model('Message', MessageSchema);