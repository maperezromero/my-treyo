const {MongoClient} = require('mongodb');



async function getTasksJSON( req, res, next) {
    
    const client = new MongoClient(uri);
    try {
    
        //console.log(output);
        res.send({
            status: 'ok',
            data: output,
        })

    
    } catch (error) {
        console.log(error);
    } finally{
        await client.close();
    }

}

module.exports = {getTasksJSON};