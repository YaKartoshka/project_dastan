const admin=require('firebase-admin')
const serviceAccount = require("../pfiles/serviceAccKey.json");

const firebaseConfig = {
    apiKey: "AIzaSyAZIFUNZRcQazS6jHGLLxbRjRTyTUvLPg0",
    authDomain: "ailabskz2022.firebaseapp.com",
    projectId: "ailabskz2022",
    storageBucket: "ailabskz2022.appspot.com",
    messagingSenderId: "146323441253",
    appId: "1:146323441253:web:544498bc3d2aff2b23688c",
    measurementId: "G-KZVNBE12LB"
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  const fdb=admin.firestore()
  

  module.exports = fdb;