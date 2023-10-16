const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'inactive' } 
});

module.exports = mongoose.model('admin_collection', adminSchema);
