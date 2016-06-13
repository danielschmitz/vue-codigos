var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var postSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);