const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// This is Jahid aria if you want any proves haha


const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const blogsCollection = client.db('Promise_hospital').collection('Blogs')

        router.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })

        router.get('/blogs', async (req, res) => {
            const query = {}
            const blogs = await blogsCollection.find(query).toArray()
            res.send(blogs)
        })

        router.get('/blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const blog = await blogsCollection.findOne(query)
            res.send(blog)
        })
    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/nameSix', (req, res) => {
    res.send('namesix')
})

module.exports = router;