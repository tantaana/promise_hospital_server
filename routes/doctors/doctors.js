const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const userData = client.db('Promise_hospital').collection('userData');

        router.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })

        router.get('/user/doctor/:email', async (req, res) => {
            const email = req.params.email
            console.log(email)
            const query = { email }
            const user = await userData.findOne(query)
            // res.send({ users, isSeller: users?.seller === true })
            res.send({ user, isDoctor: user?.userType === "doctor" })
        })
    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/doctors', (req, res) => {
    res.send('doctros')
})

module.exports = router;