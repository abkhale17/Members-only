var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var MessageSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User', required:true}
  }
);

MessageSchema.plugin(timestamps);

module.exports = mongoose.model('Message', MessageSchema);