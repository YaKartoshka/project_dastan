const admin=require('firebase-admin')
const serviceAccount = require("./pfiles/serviceAcckey.json");


  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  const fdb=admin.firestore();
  

  module.exports = fdb;