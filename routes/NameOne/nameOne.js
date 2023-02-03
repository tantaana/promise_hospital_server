const express = require('express');
const router = express.Router();
const multer =require("multer")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const specialitiesCollection = client.db('Promise_hospital').collection('specialities')
        
        
        router.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })
        router.post('/specialities', async (req, res) => {
            const specialities = req.body;
            specialities.createdAt = new Date();
            console.log(specialities);
            const result = await specialitiesCollection.insertOne(specialities)
            res.send(result);
        })
        router.get('/specialities', async (req, res) => {
            const query = {};
            const specialities = await specialitiesCollection.find(query).toArray()
            res.send(specialities)
        })
        router.get('/specialities/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const specialities = await specialitiesCollection.findOne(query)
            res.send(specialities)
        })
        router.delete('/specialities/:id', async (req, res) => {
            console.log(req)
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await specialitiesCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })
    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/nameOne',(req,res)=>{
res.send('nameOne')
})

module.exports = router;