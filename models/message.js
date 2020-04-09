var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    timestamps: true,
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User', required:true}
  }
);

module.exports = mongoose.model('Message', MessageSchema);