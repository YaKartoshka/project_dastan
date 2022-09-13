console.log('started');
        const firebaseConfig = {
        apiKey: "AIzaSyCae2s-xNeb7UZHjPSGySkwviiWaMp7F0c",
        authDomain: "database-zapis.firebaseapp.com",
        projectId: "database-zapis",
        storageBucket: "database-zapis.appspot.com",
        messagingSenderId: "543722776859",
        appId: "1:543722776859:web:f1b3279f70c9dead094bbe",
        measurementId: "G-KYXF6JJBRY"
        };
         firebase.initializeApp(firebaseConfig);
         let fdb= firebase.firestore();