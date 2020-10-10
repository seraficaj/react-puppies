var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puppySchema = new Schema({
  name: {type: String, required: true},
  breed: {type: String, default: 'Mixed'},
  age: {type: Number, default: 0},
  //One-To-One relationship between Dog and User (1 dog: 1 hooman)
  owner: {type: Schema.Types.ObjectId, ref:'User'},
  //One-To-Many relationship between Dog and Users (1 dog: infinite love!)
  likes: [{type: Schema.Types.ObjectId, ref:'User'}] 
},{
  timestamps: true
});

module.exports = mongoose.model('Puppy', puppySchema);