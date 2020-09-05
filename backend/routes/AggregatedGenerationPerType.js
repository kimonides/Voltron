const router = require('express').Router();
const {sendQuery} = require('../sendQuery.js');

router.route('/:area/:productionType/:timeres/date/:date').get(async (req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const[year,month,day] = req.params.date.split('-');
    const timeres = req.params.timeres;
    const area = req.params.area
    const productionType = req.params.productionType;
    if(!year || !month || !day || !timeres || !area || !productionType || isNaN(day) || isNaN(month) || isNaN(year) )
    {
        res.status(400).send('Bad Request');
        return;
    }

    var query;
    if(productionType=='AllTypes'){
        query ={
            text: `SELECT * from get_aggregated_generation_all_types($1 ,$2,cast($3 as INT),cast($4 as INT),cast($5 as INT),$6)`,
            values: [area,timeres,year,month,day,token]
        }
    }
    else{
        query ={
            text: `SELECT * from get_aggregated_generation($1 ,$2,$3,cast($4 as INT),cast($5 as INT),cast($6 as INT),$7)`,
            values: [area,timeres,productionType,year,month,day,token]
        }
    }

    sendQuery(query,res,format);

});



router.route('/:area/:productionType/:timeres/month/:date').get(async (req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const[year,month] = req.params.date.split('-');
    const timeres = req.params.timeres;
    const area = req.params.area
    const productionType = req.params.productionType;
    if(!year || !month || !timeres || !area || !productionType || isNaN(month) || isNaN(year) )
    {
        res.status(400).send('Bad Request');
        return;
    }

    var query;
    if(productionType=='AllTypes'){
        query ={
            text: `SELECT * from get_aggregated_generation_all_types_month($1 ,$2,cast($3 as INT),cast($4 as INT),$5)`,
            values: [area,timeres,year,month,token]
        }
    }
    else{
        query ={
            text: `SELECT * from get_aggregated_generation_month($1 ,$2,$3,cast($4 as INT),cast($5 as INT),$6)`,
            values: [area,timeres,productionType,year,month,token]
        }
    }

    sendQuery(query,res,format);
});


router.route('/:area/:productionType/:timeres/year/:date').get(async (req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const format = req.query.format;
    const [year] = req.params.date.split('-');
    const timeres = req.params.timeres;
    const area = req.params.area
    const productionType = req.params.productionType;

    if(!year || !timeres || !area || !productionType || isNaN(year) )
    {
        res.status(400).send('Bad Request');
        return;
    }

    var query;
    if(productionType=='AllTypes'){
        query ={
            text: `SELECT * from get_aggregated_generation_all_types_year($1 ,$2,cast($3 as INT),$4)`,
            values: [area,timeres,year,token]
        }
    }
    else{
        query ={
            text: `SELECT * from get_aggregated_generation_year($1 ,$2,$3,cast($4 as INT),$5)`,
            values: [area,timeres,productionType,year,token]
        }
    }

    
    sendQuery(query,res,format);
});

module.exports = router;