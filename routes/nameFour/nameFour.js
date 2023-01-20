const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const popularPackeges = client.db('Promise_hospital').collection('popularPackages')
        
        router.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })

        router.get('/packages', async(req, res) =>{
            const query = {}
            const result = await popularPackeges.find(query).toArray()
            res.send(result)
        })

        router.get('/details/:id', async(req, res) =>{
            const id = req.params.id
            console.log(id)
            const query = {_id: ObjectId(id)}
            const result = await popularPackeges.findOne(query)
            res.send(result)
        })


    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/nameFour',(req,res)=>{
res.send('nameFour')
})

module.exports = router;