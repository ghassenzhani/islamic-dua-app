import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/islamic-dua-app';

console.log('🔌 Testing MongoDB connection...');
console.log(`📍 Connection URI: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`); // Hide password

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. MongoDB is running (local) or Atlas connection string is correct');
    console.error('   2. Your .env file has the correct MONGODB_URI');
    console.error('   3. For Atlas: IP is whitelisted and credentials are correct');
    process.exit(1);
  });

