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
   
    res.sendFile(path.join(__dirname + '/views/signUp.html'));

});

app.post('/index', (req,res)=>{

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


app.get('/register', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/signUp.html'));

});

app.get('/email_confirm', (req,res)=>{
   
    res.sendFile(path.join(__dirname + '/views/email.confirm.html'));

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
    res.sendFile(path.join(__dirname + '/views/employers.html'));
    
});
app.post('/addEvent',async(req,res)=>{
    const time=req.body.selected_time;
    const service=req.body.service_type;
    const employee_name=req.body.employee;
    const employers_sch=fdb.collection('employers_schedule');
    const employers_qS=await employers_sch.get();
    
    var data={
        time:time,
        service:service,
        full_name:employee_name
    }
     const new_event=await fdb.collection('employers_schedule').add(data);
     res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
});