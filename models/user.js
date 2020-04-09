var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    passsword: { type: String, required: true },
    membership_status: {type: String, required: true, enum: ['Active', 'Contact','Expired','Cancelled' ], default: 'Contact'},
    message: {type: Schema.Types.ObjectId, ref:'Message'}
  }
);

module.exports = mongoose.model('User', UserSchema);