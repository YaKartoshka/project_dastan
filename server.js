const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
const port=3000|| process.env.port;
const path=require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public'))
app.use("/public", express.static(__dirname + "/public"));
const fdb=require('./config');

app.get('/', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/employers.html'));

});

app.post('/addEmployer',async(req,res)=>{
    const name=req.body.name;
    const surname=req.body.surname;
    const patronymic=req.body.patronymic;
    const quality=req.body.quality;
    const info=req.body.info;

    const employers=fdb.collection('employers');
    

    var employer={
        name:name,
        surname:surname,
        patronymic:patronymic,
        quality:quality,
        info:info
    }
    const new_employer=await fdb.collection('employers').add(employer);
    
});

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
});