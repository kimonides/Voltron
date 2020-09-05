function errorHandler(err)
{
    if(err.message == 'not authorized')
        console.log('Not Authorized');
    else if (err.message == 'out of quota')
        console.log('Out of quota');
    else 
        throw err;
}

module.exports = {errorHandler};