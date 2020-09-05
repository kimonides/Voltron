const router = require('express').Router();

const {sendQuery} = require('../sendQuery.js');

router.route('/:area/:timeres/date/:date').get(async(req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const[year,month,day] = req.params.date.split('-');
    const timeres = req.params.timeres;
    const area = req.params.area;
    if(!year || !month || !day || !timeres || !area || isNaN(day) || isNaN(month) || isNaN(year)  )
    {
        res.status(400).send('Bad Request');
        return;
    }

    const query ={
        text: `SELECT * from get_actual_vs_forecast($1 ,$2,cast($3 as INT),cast($4 as INT),cast($5 as INT),$6)`,
        values: [area,timeres,year,month,day,token]
    }

    sendQuery(query,res,format);

});



router.route('/:area/:timeres/month/:date').get((req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const[year,month] = req.params.date.split('-');
    const timeres = req.params.timeres;
    const area = req.params.area

    if(!year || !month || !timeres || !area || isNaN(month) || isNaN(year)  )
    {
        res.status(400).send('Bad Request');
        return;
    }

    const query ={
        text: `SELECT * from get_actual_vs_forecast_month($1 ,$2,cast($3 as INT),cast($4 as INT),$5)`,
        values: [area,timeres,year,month,token]
    }

    sendQuery(query,res,format);
});


router.route('/:area/:timeres/year/:date').get((req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const [year] = req.params.date.split('-');
    const timeres = req.params.timeres;
    const area = req.params.area

    if(!year || !timeres || !area || isNaN(year) )
    {
        res.status(400).send('Bad Request');
        return;
    }

    const query ={
        text: `SELECT * from get_actual_vs_forecast_year($1 ,$2,cast($3 as INT),$4)`,
        values: [area,timeres,year,token]
    }

    sendQuery(query,res,format);
});



module.exports = router;

