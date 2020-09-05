function errorHandler(err,res)
{
    if(err.message == 'not authorized')
        res.status(401).send('Not Authorized');
    else if (err.message == 'out of quota')
        res.status(402).send('Out of quota');
    else{
        console.log(err);
        res.status(418).send('Unrecognized error');
    }
}

module.exports = {errorHandler};