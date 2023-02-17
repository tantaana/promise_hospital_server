const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const store_id = 'promi63e6198691de9'
const store_passwd = 'promi63e6198691de9@ssl'
const is_live = false //true for live, false for sandbox




const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




const run = async () => {

    try {
        const userData = client.db('Promise_hospital').collection('userData');
        const categoriesCollection = client.db('categories').collection('category')
        const appointmentData = client.db('Promise_hospital').collection('appointmentData');
        const sslPaidCollection = client.db('ssl').collection('ssls');
        
        router.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })

        router.get('/details', async (req, res) => {
            
            const query = {};
            const result = await appointmentData.find(query).toArray();
            res.send(result)
        })



        router.post('/ssl', async (req, res) => {
          
            const id = req.body.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await appointmentData.findOne(query);
            const transectionId = new ObjectId().toString();
            console.log('tr'+transectionId)
          

            const data = {
                total_amount: result.fees,
                currency: 'BDT',
                tran_id: transectionId, // use unique tran_id for each api call
                success_url: `http://localhost:5000/success?transectionId=${transectionId}`,
                fail_url: 'http://localhost:5000/fail',
                cancel_url: 'http://localhost:5000/cancel',
                ipn_url: 'http://localhost:3030/ipn',
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: result.patientName,
                cus_email: result.patientEmail,
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
          
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
            sslcz.init(data).then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL
                let nPaid=  sslPaidCollection.insertOne({
                    ...data,
                    transectionId,
                    paid: false,

                })
                res.send({uri:GatewayPageURL})
                
            });
        })


        router.post('/success',async(req,res)=>{
            const{transectionId} = req.query
            const result = await sslPaidCollection.updateOne({transectionId},{$set:{paid:true}})
            if (result.modifiedCount>0){
                res.redirect(`http://localhost:3000/success?transectionId=${transectionId}`)

                }
            
        })

        router.get('/ssl/:id',async(req,res)=>{
            const {id} = req.params;
            const order =await sslPaidCollection.findOne({transectionId:id});
            res.send(order)
        })



        router.put('/users/edite/', async(req,res)=>{
            const {email,name}= req.body;
            const update= req.body;

            console.log(email)
            const find = await userData.updateOne({email},{$set:{name:name,email:email}});
            res.send(find)
        })








    }
    finally {



    }



}
run().catch(err => console.log(err))



router.get('/nameTwo',(req,res)=>{
res.send('nameTwo')
})

module.exports = router;