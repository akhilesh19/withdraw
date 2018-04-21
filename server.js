const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ExchangeBackup = require('./models/exchangeBackup')
const Currency = require('./models/currency')
const path = require('path');
const Response = require('./responseHandler.js')
const request = require('request');
const CronJob = require('cron').CronJob;


const app = express();
app.set('port', (process.env.PORT || 5003));
// const DB_URL = 'mongodb://199.188.204.100/exchange'
const DB_URL = 'mongodb://127.0.0.1/exchange'

mongoose.connection.openUri(DB_URL);
mongoose.connection.on('connected',  ()=> {  
 console.log('success','Mongoose default connection open to ' + DB_URL);
}); 


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(express.static(path.join(__dirname, 'assest')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => res.status(200).json({
    'message': 'Server running'
}))
app.post('/login',(req,res)=>{
if(!req.body.email || ! req.body.password)
	 Response.sendResponse(res,400,"Please fill required field.")
else
	ExchangeBackup.findOne({email:req.body.email,password:req.body.password},(err,res)=>{
		if(err)
			 Response.sendResponse(res,500,"Somthing went wrong.")
		else
			 Response.sendResponse(res,200,"Login successfully.",res)

	})
})

app.post('/getUserDetails',(req,res)=>{
	ExchangeBackup.find({currency:req.body.currency},(err,result)=>{
		if(err)
			 Response.sendResponse(res,500,"Somthing went wrong.")
		else
			 Response.sendResponse(res,200,"Data show successfully.",result)
	})
})

app.get('/getCurrencyList',(req,res)=>{
  Currency.find({},(err,result)=>{
    if(err)
       Response.sendResponse(res,500,"Somthing went wrong.")
    else
       Response.sendResponse(res,200,"Data show successfully.",result)
  })
})

//app.use('/api/v1/users', require('./routes/user'));
//app.use('/api/v1/buses', require('./routes/bus'));
//app.use('/api/v1/routes', require('./routes/route'));
// app.use('/api/v1/organisation',require('./routes/organisation'));

app.listen(app.get('port'), () => console.log('Server running on ' + app.get('port')));