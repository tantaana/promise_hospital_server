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
        const diagnosisCollection = client.db('Promise_hospital').collection('diagnosis')
        const virtualAppointmentCollection = client.db('Promise_hospital').collection('virtualAppointments')
        const docinfoCollection = client.db('Promise_hospital').collection('docInfo')

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

        router.get('/diagnosis', async (req, res) => {
            const query = {}
            const diagnosis = await diagnosisCollection.find(query).toArray()
            res.send(diagnosis)
        })

        router.post('/diagnosis', async (req, res) => {
            const test = req.body;
            // console.log(package)
            const result = await diagnosisCollection.insertOne(test)
            res.send(result)
        })

        router.get('/diagnosis/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const diagnosis = await diagnosisCollection.findOne(query)
            res.send(diagnosis)
        })
        // virtualAppointmentCollection
        router.get('/virtualAppointmentData', async (req, res) => {
            const query = {}
            const result = await virtualAppointmentCollection.find(query).toArray()
            res.send(result)
        })

        router.post('/virtualAppointmentData', async (req, res) => {
            const appointmentData = req.body
            const result = await virtualAppointmentCollection.insertOne(appointmentData)
            res.send(result)
        })



        router.get('/user/virtualAppointmentData', async (req, res) => {
            const patientEmail = req.query.patientEmail;
            const query = { patientEmail: patientEmail }
            const result = await virtualAppointmentCollection.find(query).toArray()
            res.send(result)
        })


        router.get('/doctor/virtualAppointmentData', async (req, res) => {
            const doctor_email = req.query.doctor_email;
            const query = { doctor_email: doctor_email }
            const result = await virtualAppointmentCollection.find(query).toArray()
            res.send(result)
        })


        // router.put('/edit/virtualAppointment', async (req, res) => {
        //     const data = req.body
        //     const filter = {}
        //     const options = { upsert: true }
        //     const updateDoc = {
        //         $set: data,
        //     }
        //     const result = await virtualAppointmentCollection.updateOne(filter, updateDoc, options)
        //     res.send(result)
        // })

        router.put('/edit/virtualAppointment/:doctor_email', async (req, res) => {
            // const { doctor_email } = req.params.doctor_email;
            const { doctor_email } = req.params;
            const data = req.body;
            // console.log(email)
            const find = await virtualAppointmentCollection.updateOne({ doctor_email }, { $set: { Meet_Link: data } });
            res.send(find)

            // const options = { upsert: true }
            // const filter = {}
            // const updatedDoc = {
            //     $set: {
            //         userType: 'Doctor'
            //     }
            // }
            // const result = await userData.updateOne(filter, updatedDoc, options)
            // res.send(result)
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