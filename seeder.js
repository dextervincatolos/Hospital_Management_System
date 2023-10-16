const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./server/model/admin_model'); // Import the admin schema

mongoose.connect('mongodb://127.0.0.1:27017/hmsdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await Admin.deleteMany({}); // Clear any existing admin records

    const adminData = {
      username: 'admin',
      password: await bcrypt.hash('adminpassword', 10),
      email: 'admin@example.com'
    };

    const admin = await Admin.create(adminData);
    console.log('Admin record created:', admin);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
});
