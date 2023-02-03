const express = require('express');
const http = require('http')
const router = express.Router();
const Server = require('socket.io').Server
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// connectDb()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("we are connected")

    socket.on('chat', chat => {
        io.emit('chat', chat)
    })

    socket.on('disconnected', () => {
        console.log('disconnected')
    })
})


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

        // router.get('/api/chat', async (req, res) => {
        //     res.send(chats)
        // })

        // router.get('/api/chat/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const singleChat = await chats.find((c) => c._id === id)
        //     res.send(singleChat)
        // })

        // //////   chat aria ///////////

        // router.route('/').post(registerUser)
    }
    finally {



    }



}
run().catch(err => console.log(err))

// server.listen(() => {
//     console.log('server soi')
// })

router.get('/nameSix', (req, res) => {
    res.send('namesix')
})


module.exports = router;