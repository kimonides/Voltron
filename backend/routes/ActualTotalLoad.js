const router = require('express').Router();
const {sendQuery} = require('../sendQuery');

router.route('/:country/:freq/date/:date').get( (req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const[year,month,day] = req.params.date.split('-');
    const freq = req.params.freq;
    const country = req.params.country;

    if(!year || !month || !day || !freq || !country || isNaN(day) || isNaN(month) || isNaN(year)  )
    {
        res.status(400).send('Bad Request');
        return;
    }

    const query ={
        text: `SELECT * from get_actual_total_load($1 ,$2,cast($3 as INT),cast($4 as INT),cast($5 as INT),$6)`,
        values: [country,freq,year,month,day,token]
    }; 

    sendQuery(query,res,format);
});



router.route('/:country/:freq/month/:date').get( (req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const[year,month] = req.params.date.split('-');
    const freq = req.params.freq;
    const country = req.params.country

    if(!year || !month || !freq || !country || isNaN(month) || isNaN(year) )
    {
        res.status(400).send('Bad Request');
        return;
    }

    const query ={
        text: `SELECT * from get_actual_total_load_month($1 ,$2,cast($3 as INT),cast($4 as INT),$5)`,
        values: [country,freq,year,month,token]
    };

    sendQuery(query,res,format);
});


router.route('/:country/:freq/year/:date').get( (req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const [year] = req.params.date.split('-');
    const freq = req.params.freq;
    const country = req.params.country

    if(!year || !freq || !country || isNaN(year) )
    {
        res.status(400).send('Bad Request');
        return;
    }

    const query ={
        text: `SELECT * from get_actual_total_load_year($1 ,$2,cast($3 as INT),$4)`,
        values: [country,freq,year,token]
    };

    sendQuery(query,res,format);
});

module.exports = router;

