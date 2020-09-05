//const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
const fs = require('fs');
var token = fs.readFileSync('./softeng19bAPI.token',"utf8");
var request = require('request').defaults({strictSSL: false});
var baseURL = 'https://localhost:8765/energy/api/';
const dateTypes = {
    1 : 'year',
    2 : 'month',
    3 : 'date'
};
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const getActualTotalLoad = (area, timeres, date, format) => 
{
    const dateType = dateTypes[date.split('-').length];
    const url = baseURL+'ActualTotalLoad/'+area+'/'+timeres+'/'+dateType+'/'+date+'?format='+format;
    request.get({
        url: url,
        headers: {
            'x-observatory-auth': token
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            if(format=='csv' || body == 'No Data') console.log(body);
            else{
                console.log(JSON.parse(body));
                return JSON.parse(body);
            }
        }
    })
}


const getAggregatedGenerationPerType = (area, timeres, productionType, date, format) => {
    const dateType = dateTypes[date.split('-').length];
    const url = baseURL+'AggregatedGenerationPerType/'+area+'/'+productionType+'/'+timeres+'/'+dateType+'/'+date+'?format='+format;
    request.get({
        url: url,
        headers: {
            'x-observatory-auth': token
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            if(format=='csv' || body == 'No Data') console.log(body);
            else console.log(JSON.parse(body));
        }
    })
}


const getDayAheadTotalLoadForecast = (area, timeres, date, format) => {
    const dateType = dateTypes[date.split('-').length];
    const url = baseURL+'DayAheadTotalLoadForecast/'+area+'/'+timeres+'/'+dateType+'/'+date+'?format='+format;
    request.get({
        url: url,
        headers: {
            'x-observatory-auth': token
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            if(format=='csv' || body == 'No Data') console.log(body);
            else console.log(JSON.parse(body));
        }
    })
}

const getActualVsForecast = (area, timeres, date, format) => {
    const dateType = dateTypes[date.split('-').length];
    const url = baseURL+'ActualvsForecast/'+area+'/'+timeres+'/'+dateType+'/'+date+'?format='+format;
    request.get({
        url: url,
        headers: {
            'x-observatory-auth': token
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            if(format=='csv' || body == 'No Data') console.log(body);
            else console.log(JSON.parse(body));
        }
    })
}


const newUser = (username, email, password, quota) => {
    request.post({
        url: baseURL+'Admin/users',
        headers: {
            'x-observatory-auth': token
        },
        form: {
          username: username,
          password: password,
          email : email,
          requestsPerDayQuota : quota
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            console.log(JSON.parse(body));
        }
    })
}

const userStatus = (username) => {
    request.get({
        url: baseURL+'Admin/users/'+username,
        headers: {
            'x-observatory-auth': token
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            console.log(JSON.parse(body));
        }
    })
}

const updateUser = (username, email, password, quota) => {
    if(password===''){
        console.log('Empty password');
        return;
    }
    request.put({
        url: baseURL+'Admin/users/'+username,
        headers: {
            'x-observatory-auth': token
        },
        form: {
            password: password,
            email : email,
            requestsPerDayQuota : quota
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            try{
                console.log(JSON.parse(body));
            }
            catch(error){
                console.log(body);
            }
        }
    })
}

function login(username,password)
{
    request.post({
        url: baseURL+'Login',
        form: {
          username: username,
          password: password
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            console.log(JSON.parse(body)['token']);
            fs.writeFileSync('./softeng19bAPI.token',JSON.parse(body)['token']);
            token = fs.readFileSync('./softeng19bAPI.token',"utf8");
        }
    })
}

function logout()
{
    fs.writeFileSync('./softeng19bAPI.token','');
}


function importCsv(filepath, dataset) {
    request.post({
        url: baseURL+'Admin/'+dataset,
        headers: {
            'x-observatory-auth': token
        },
        formData : {
            'file' : fs.createReadStream(filepath)
        }
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            try{
                console.log(JSON.parse(body));
            }
            catch(err){
                console.log(body);
            }
        }
    })
}

function healthCheck()
{
    request.get({
        url: baseURL+'HealthCheck'
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            try{
                console.log(JSON.parse(body));
            }
            catch(err){
                console.log(body);
            }
        }
    })
}

function reset()
{
    request.post({
        url: baseURL+'Reset'
    }, function (err, httpResponse, body) { 
        if(err) throw err;
        else{
            try{
                console.log(JSON.parse(body));
            }
            catch(err){
                console.log(body);
            }
        }
    })
}



module.exports = {
    getActualTotalLoad,
    getAggregatedGenerationPerType, 
    getDayAheadTotalLoadForecast,
    getActualVsForecast,
    newUser, updateUser, userStatus, importCsv,login,logout,healthCheck,reset
}