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

        const verifyAdmin = async (req, res, next) => {
            const decoded = req.decoded.email
            const query = { email: decoded }
            const user = await userData.findOne(query)
            if (user?.userType !== "admin") {
                return res.status(403).send({ message: "Forbiden access" })
            }
            next()
        }

        router.get('/user/admin/:email', async (req, res) => {
            const email = req.params.email
            console.log(email)
            const query = { email }
            const user = await userData.findOne(query)
            res.send({ isAdmin: user?.userType === "admin" })
        })

    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/admin', (req, res) => {
    res.send('admin')
})

module.exports = router;