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
        const newSpecialities = client.db('Promise_hospital').collection('newSpecialities');

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
            else {
                return console.log('hello');
            }

        })

        router.get('/userData', async (req, res) => {
            const query = {};
            const options = await userData.find(query, { userType: 1, _id: 0 }).sort({ "userType": 1 }).toArray();
            res.send(options)
        });

        router.put('/userData/makeAdmin/:id', async (req, res) => {
            // const decodedEmail = req.decoded.email;
            // const query = { email: decodedEmail }
            // const user = await usersCollections.findOne(query)
            // if (user?.role !== 'admin') {
            //     return res.status(403).send({ message: 'forbidden access ' })
            // }

            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    role: 'Admin'
                }
            }
            const result = await userData.updateOne(filter, updatedDoc, options)
            res.send(result)

        });

        router.put('/userData/:id', async (req, res) => {
            // const decodedEmail = req.decoded.email;
            // const query = { email: decodedEmail }
            // const user = await usersCollections.findOne(query)
            // if (user?.role !== 'admin') {
            //     return res.status(403).send({ message: 'forbidden access ' })
            // }

            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    userType: 'Doctor'
                }
            }
            const result = await userData.updateOne(filter, updatedDoc, options)
            res.send(result)

        });

        router.delete('/userData/deletedData/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await userData.deleteOne(filter)
            res.send(result)
        })

        // router.get('/emailData', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { email: email };
        //     const result = await userData.find(query).toArray();
        //     res.send(result)
        // })

        // ----------------------------------

        router.get('/docInfo', async (req, res) => {
            const query = {};
            // const options = await docInfo.find(query).toArray();
            const options = await docInfo.find(query, { name: 1, _id: 0 }).sort({ "name": 1 }).toArray();
            res.send(options)
        })

        router.get('/docInfo/:docURL', async (req, res) => {
            const docURL = req.params.docURL;
            const query = { docURL: docURL };
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

        //------------------------------

        router.get('/specialities', async (req, res) => {
            const query = {};
            const options = await newSpecialities.find(query, { speciality: 1, _id: 0 }).sort({ "speciality": 1 }).toArray();
            res.send(options)
        });

        router.get('/specialities/:speciality_id', async (req, res) => {
            const speciality_id = req.params.speciality_id;
            const query = { speciality_id: speciality_id };
            const result = await newSpecialities.findOne(query);
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