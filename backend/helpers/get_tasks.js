const {MongoClient, LEGAL_TCP_SOCKET_OPTIONS} = require('mongodb');



async function getTasks( req, res, next) {
    
    console.log('estoy');
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        const database = client.db('Treyo');
        const tasks = database.collection('Tasks');

        const estimate = await tasks.estimatedDocumentCount();

        const output = await tasks.find({}).toArray();

        console.log(output);
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

module.exports = {getTasks};