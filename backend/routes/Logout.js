const router = require('express').Router();
const { client } = require('../database.js');


router.route('/').post((req,res) => 
{
    const token = req.headers['x-observatory-auth'];
    const query = {
        text : 'update users set token=null where token=$1',
        values : [token]
    };
    client.query(query,(err,queryResult)=>{
        if(err) throw err;
        res.status(200).send(' ');
    })
});



module.exports = router;

