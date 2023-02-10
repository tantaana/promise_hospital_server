const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const verifyJWT = require('../JWT/JWT');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


app.use(cors())
// app.use(verifyJWT)
app.use(express.json())

const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(404).send({messages: "unauthorized access"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded){
        if(err){
            return res.status(403).send({messages: "Forbidden access"})
        }
        req.decoded = decoded
        next()
    })
}

const run = async () => {

    try {
        const categoriesCollection = client.db('categories').collection('category')
        const popularPackeges = client.db('Promise_hospital').collection('popularPackages')
        const userData = client.db('Promise_hospital').collection('userData');
        const paymentsCollection = client.db('Promise_hospital').collection('payments')
        const appointmentData = client.db('Promise_hospital').collection('appointmentData');
        
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

        router.get('/booking/:id', async(req, res) =>{
            const id = req.params.id 
            const query = {_id : ObjectId(id)}
            const booking = await appointmentData.findOne(query)
            res.send(booking)
        })

        router.get('/details/:id', async(req, res) =>{
            const id = req.params.id
            // console.log(id)
            const query = {_id: ObjectId(id)}
            const result = await popularPackeges.findOne(query)
            res.send(result)
        })

        router.post('/packages', async(req, res) =>{
            const packages = req.body;
            const result = await popularPackeges.insertOne(packages)
            res.send(result)
        })

        router.delete('/packages/:id', async(req, res) =>{
            const id = req.params.id 
            // console.log(id)
            const query = {_id: ObjectId(id)}
            const result = await popularPackeges.deleteOne(query)
            res.send(result)
        })

        router.get('/jwt', async(req, res) =>{
            const email = req.query.email 
            // console.log(email)
            const query = {email: email}
            const user = await userData.findOne(query)
            if(user){
                const token = jwt.sign({email}, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
                return res.send({accessToken: token})
            }
            res.status(403).send({ accessToken: ""})
        })

        router.post('/create-payment-intent', async (req, res) =>{
            const booking = req.body 
            const price = booking.fees 
            const amount = price * 100;

            const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount : amount,
                "payment_method_types": [
                    "card"
                ]
            })

            res.send({
                clientSecret: paymentIntent.client_secret,
            })
        })

        router.post('/payments', async(req, res) =>{
            const payment = req.body 
            const result = await paymentsCollection.insertOne(payment)
            const id = payment.bookingId
            const filter = {_id: ObjectId(id)}
            const updateDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId
                }
            }
            const updateResult = await appointmentData.updateOne(filter, updateDoc)
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
