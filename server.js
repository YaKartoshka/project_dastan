const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
const port=3000|| process.env.port;
const path=require('path');
const firebase=require('./firebase_config');
const auth=require('firebase/auth');
require('./admin_config')
const admin = require("firebase-admin");
const { getAuth } = require('firebase/auth');
const fauth=getAuth(firebase.getApp())
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const alert = require('alert'); 
const fdb=admin.firestore();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public'))
app.use("/public", express.static(__dirname + "/public"));

var email="email"
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 60000  },
    resave: false 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const myusername = 'user1'
const mypassword = 'mypassword'
var session;


app.get('/', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signIn.html'));

});

app.post('/signUp', async (req, res) => {
     const email = req.body.email;
     const password = req.body.password;
     auth.createUserWithEmailAndPassword(fauth,email,password)
     .then((userCredential) => {
        session=req.session;
        session.email=email;  
        const new_company=fdb.collection('company').add({
            company_name: 'test',
            email: email
        });
        session.id=new_company.id;
        console.log(session.id)

        res.sendFile(path.join(__dirname + '/views/index.html'));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.redirect('back')
      });
    
 
  });

app.post('/signIn', async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    var id;
    auth.signInWithEmailAndPassword(fauth,email, password)
    .then(async(userCredential) => {
    
    session=req.session;
    session.email=email
    const company=await fdb.collection('company');
    const company_qS=company.get();
    (await company_qS).forEach(doc=>{
        if(doc.data().email==email){
            id=doc.id;
        }
    });
    res.cookie('fid',`${id}`);
    res.redirect('/index');
  })
    .catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    res.redirect('back')
    
  });
  

});

app.post('/addEmployer', async(req,res)=>{
const {name,surname,patronymic,quality,info}=req.body;
const employer_data={
    name:name,
    surname:surname,
    patromymic:patronymic,
    quality:quality,
    info:info
}
console.log(req.body);
var fid=req.cookies.fid;
const employers=fdb.collection('company').doc(`${fid}`).collection('employers');
const new_employer=await fdb.collection('company').doc(`${fid}`).collection('employers').add(employer_data)
res.redirect('back');
})

app.get('/index', (req,res)=>{

    res.sendFile(path.join(__dirname + '/views/index.html'));

});
app.post('/index', (req,res)=>{

    res.sendFile(path.join(__dirname + '/views/index.html'));


});
app.get('/employers', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/employers.html'));

});

app.get('/events', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/events.html'));

});

app.get('/login', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signIn.html'));

});


app.get('/signUp', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signUp.html'));

});

app.get('/email_confirm', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/email.confirm.html'));

});



app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
});

