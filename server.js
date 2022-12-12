const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 4000;
const path=require('path');
const fs=require('fs')
const saltedMd5=require('salted-md5')
const firebase=require('./firebase_config');    
const auth=require('firebase/auth');
require('./admin_config')
const admin = require("firebase-admin");
const { getAuth } = require('firebase/auth');
const { getStorage, ref } = require("firebase/storage");
const fauth=getAuth(firebase.getApp())
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { json } = require('body-parser');
const fileUpload = require('express-fileupload');
const uuid=require('uuid-v4')
const Validator=require('validatorjs');
const multer = require('multer');
const moment=require('moment');
const fdb=admin.firestore();
const storage=admin.storage().bucket('gs://database-zapis.appspot.com');
require('dotenv').config()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public'))
app.use("/public", express.static(__dirname + "/public"));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 60000  },
    resave: false 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
var session;

const multer_storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'public/uploads')
    },
    filename(req,file,cb){
        const date = moment().format('DDMMYYYY-HHmmss SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const limits = {
    fileSize: 1024*1024*5
}
const upload = multer({
    storage: multer_storage,
    fileFilter:fileFilter,
    limits:limits
})
app.get('/', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signIn.html'));

});

app.post('/signUp', async (req, res) => {
     const email = req.body.email;
     const password = req.body.password;
     const company_name=req.body.company_name;
     auth.createUserWithEmailAndPassword(fauth,email,password)
     .then(async(userCredential) => {
        session=req.session;
        session.email=email;  
        const new_company=await fdb.collection('company').add({
            company_name: company_name,
            email: email
        });
        session.id=new_company.id;
        console.log(session.id)
        res.cookie('fid',`${new_company.id}`);
        res.sendFile(path.join(__dirname + '/views/index.html'));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.redirect('back');
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
    const company= fdb.collection('company');
    const company_qS=await company.get();
    company_qS.forEach(doc=>{
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
    res.redirect('back');
    
  });
  

});

app.get('/signUp', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signUp.html'));

});

app.get('/signIn', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signIn.html'));

});

app.get('/index', (req,res)=>{
    if(fauth.currentUser!==null){    
    res.sendFile(path.join(__dirname + '/views/index.html'));
    }else{
        res.redirect('/');
    }
});

app.get('/employers', (req,res)=>{
    if(fauth.currentUser!==null){  
    res.sendFile(path.join(__dirname + '/views/employers.html'));
    }else{
        res.redirect('/');
    }
});

app.get('/events', (req,res)=>{
    if(fauth.currentUser!==null){  
    res.sendFile(path.join(__dirname + '/views/events.html'));
    }else{
        res.redirect('/');
    }
});

app.get('/login', (req,res)=>{
    
    res.sendFile(path.join(__dirname + '/views/signIn.html'));

});

app.post('/addEmployer', upload.single('avatar_img') ,async(req,res)=>{

    const {name,surname,patronymic,quality,info}=req.body;
    if(req.file==undefined){
        var image=null;
    }else{
        var image=req.file.path;
    }
    const data=req.body;
    
    if(data.name==undefined || data.surname==undefined ||data.quality==undefined ||data.patronymic==undefined){
        res.redirect('/employers');
    }else{
        delete data.name; 
        delete data.surname;
        delete data.patronymic;
        delete data.quality;
        delete data.info;
        delete data.avatar_img;
       
        var data_length = Object.keys(data).length;
        const employer_data={
            name:name,
            surname:surname,
            patromymic:patronymic,
            quality:quality,
            info:info
        }
        console.log(employer_data)
        var fid=req.cookies.fid;
        const storage=admin.storage().bucket('gs://database-zapis.appspot.com')
        const new_employer=await fdb.collection('company').doc(`${fid}`).collection('employers').add(employer_data);
        var employer_id=new_employer.id;
        console.log(employer_id)
        const uploadImage=async()=>{
            const metadata = {
                metadata: {
                  firebaseStorageDownloadTokens: uuid()
                },
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
              };
            
            var image_name=employer_id+path.extname(req.file.originalname)
            await storage.upload(image, {
            gzip: true,
            metadata: metadata,
            destination: `images/${employer_id}/profile_image/${image_name}`
            });
                           https://firebasestorage.googleapis.com/v0/b/database-zapis.appspot.com/o/images%2Fa9ODxR5YSPsnoNYAtvRZ%252profile_image%2a9ODxR5YSPsnoNYAtvRZ.png?alt=media
            var image_url=`https://firebasestorage.googleapis.com/v0/b/database-zapis.appspot.com/o/images%2F${employer_id}%2Fprofile_image%2F${image_name}?alt=media`
            const update_data=fdb.collection('company').doc(`${fid}`).collection('employers').doc(employer_id).update({
                profile_image:image_url
            });
        }
        if(image==undefined || image==null){
            const update_data=fdb.collection('company').doc(`${fid}`).collection('employers').doc(employer_id).update({
                profile_image:null
            });
        }else{
            uploadImage()
        }

        for (let i = 1; i < data_length/3 + 1; i++) {
            var service_data={
                service_during: data[`s_time${i}`],
                service_name: data[`s_name${i}`],
                service_price:data[`s_price${i}`]
            }
            var new_service=await fdb.collection('company').doc(`${fid}`).collection('employers').doc(`${employer_id}`).collection('services').add(service_data);
        }
        fs.unlink(image, function (err) {
            if (err) {
              console.error(err);
            } else{
                console.log()
            }
          });
        res.redirect('back');
    }
    
})
    



app.post('/email_confirm', (req,res)=>{
    
    res.sendFile(path.join(__dirname + '/views/email.confirm.html'));

});

app.get('/signOut', (req,res)=>{

    auth.signOut(fauth)

    auth.signOut(fauth).then(() => {
        res.redirect('/signIn')
      }).catch((error) => {
        // An error happened.
      });
});


app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
});

