const express = require('express');
const router = express.Router();
//const server = require("http").Server(express)
//const io = require('socket.io')(server)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//const { v4:uuidV4 } =require('uuid')

// router.set('view engin ', 'ejs')
// router.use(express.static('public'))

// server.listen(3000)

const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const specialitiesCollection = client.db('Promise_hospital').collection('specialities')
        // const docInfo = client.db('Promise_hospital').collection('docInfo');

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
        // router.get('/specialities', async (req, res) => {
        //     const query = {};
        //     const specialities = await specialitiesCollection.find(query).toArray()
        //     res.send(specialities)
        // })
        // router.get('/specialities/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const specialities = await specialitiesCollection.findOne(query)
        //     res.send(specialities)
        // })
        router.delete('/specialities/:id', async (req, res) => {
            console.log(req)
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await specialitiesCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })
        // router.get('/docInfo', async (req, res) => {
        //     const query = {};
        //     const options = await docInfo.find(query).toArray();
        //     res.send(options)
        // })

        //         router.get('/', (req, res) => {
        //             res.redirect(`/${uuidV4()}`)
        //         })

        //         router.get('/:room', (req, res) => {
        // res.render('room',{roomId:req.params.room})
        //         })
    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/nameOne', (req, res) => {
    res.send('nameOne')
})

module.exports = router;