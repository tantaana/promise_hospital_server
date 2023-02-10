const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);




const run = async () => {

    try {
        const appointmentData = client.db('Promise_hospital').collection('appointmentData');

        const userData = client.db('Promise_hospital').collection('userData');
        const docInfo = client.db('Promise_hospital').collection('docInfo');

        // ------------------------
        router.post('/createAppointment', async (req, res) => {
            const products = req.body;
            const result = await appointmentData.insertOne(products);
            res.send(result)
        })

        router.get('/createAppointment', async (req, res) => {
            const query = {};
            const options = await appointmentData.find(query).toArray();
            res.send(options)
        })

        //----------------------- 
        router.post('/userData', async (req, res) => {
            const user = req.body;
            const email = user.email;
            const query = { email: email };
            const find = await userData.findOne(query);

            if (find === null) {
                const insertData = await userData.insertOne(user);
                res.send(insertData)
            }

        })

        router.get('/userData', async (req, res) => {
            const query = {};
            const options = await userData.find(query).toArray();
            res.send(options)
        })

        // ----------------------------------

        router.get('/docInfo', async (req, res) => {
            const query = {};
            const options = await docInfo.find(query).toArray();
            res.send(options)
        })

        router.get('/docInfo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await docInfo.findOne(query);
            res.send(result)
        })

        // -----------------------------------

        router.post('/addDoctors', async (req, res) => {
            const products = req.body;
            const result = await docInfo.insertOne(products);
            res.send(result)
        })

        //------------------------------------

        router.get('/appointmentData', async (req, res) => {
            const patientEmail = req.query.patientEmail;
            const query = { patientEmail: patientEmail };
            const result = await appointmentData.find(query).toArray();
            res.send(result)
        })

        //----------------------------------

        router.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await appointmentData.findOne(query);
            res.send(result)
        })

    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/nameThree', (req, res) => {
    res.send('nameThree')
})

module.exports = router;