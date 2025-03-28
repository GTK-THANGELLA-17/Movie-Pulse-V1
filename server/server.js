const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 10000; // Use Render's assigned port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection with Retry Logic
let retryAttempts = 0;
const maxRetryAttempts = 5;

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging connection
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    retryAttempts++;
    if (retryAttempts < maxRetryAttempts) {
      console.log(`🔄 Retrying connection in 5 seconds... (${retryAttempts}/${maxRetryAttempts})`);
      setTimeout(connectDB, 5000);
    } else {
      console.error('❌ Max retry attempts reached, exiting...');
      process.exit(1);
    }
  }
};

connectDB();

// Routes
const opinionsRoutes = require('./routes/opinions'); // Ensure this file exists
app.use('/api/opinions', opinionsRoutes);

// Health Check Route for Render
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: '✅ Health Check Passed',
    timestamp: new Date().toISOString(),
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'An unexpected error occurred',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Handle Undefined Routes
app.use('*', (req, res) => {
  res.status(404).json({ message: '❌ Resource not found' });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});
