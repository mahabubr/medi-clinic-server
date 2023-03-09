require('dotenv').config()
require('colors');

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middle Were
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Medi Clinic Server Running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vlhy1ml.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db('Medi-Clinic')

        const roleCollection = database.collection('role')
        const userCollection = database.collection('user')
        const doctorCollection = database.collection('doctor')
        const hospitalCollection = database.collection('hospital')
        const pharmacyCollection = database.collection('pharmacy')

        app.post('/role', async (req, res) => {
            const query = req.body
            const result = await roleCollection.insertOne(query)
            res.send(result)
        })
        app.post('/user', async (req, res) => {
            const query = req.body
            const result = await userCollection.insertOne(query)
            res.send(result)
        })
        app.post('/doctor', async (req, res) => {
            const query = req.body
            const result = await doctorCollection.insertOne(query)
            res.send(result)
        })
        app.post('/hospital', async (req, res) => {
            const query = req.body
            const result = await hospitalCollection.insertOne(query)
            res.send(result)
        })
        app.post('/pharmacy', async (req, res) => {
            const query = req.body
            const result = await pharmacyCollection.insertOne(query)
            res.send(result)
        })


        app.get('/role-filter', async (req, res) => {
            const query = req.query.email
            const filter = { email: query }
            const result = await roleCollection.findOne(filter)
            res.send(result)
        })

        app.get('/hospital', async (req, res) => {
            const query = {}
            const result = await hospitalCollection.find(query).toArray()
            res.send(result)
        })

        app.put('/hospital-room', async (req, res) => {
            const data = req.data
        })

    }
    catch (e) {
        console.log(e.message);
    }
}

run()

app.listen(port, () => {
    console.log(`Server Running on PORT ${port}`.bgMagenta);
})