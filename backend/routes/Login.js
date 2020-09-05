const router = require('express').Router();
const { client } = require('../database.js');
const { errorHandler } = require('../errorHandler');

router.route('/').post((req,res) => 
{
    const username = req.body.username;
    const password = req.body.password;
    const crypto = require('crypto');
    const token = crypto.randomBytes(16).toString('hex');

    const query = {
        text : `select * from login($1,$2,$3)`,
        values : [username,password,token]
    }

    client.query(query,(err,queryResult)=>{
        if(err) errorHandler(err,res);
        else
            res.status(200).json( {'token':token , 'admin':queryResult.rows[0]['admin']} );
    })
    
});



module.exports = router;

