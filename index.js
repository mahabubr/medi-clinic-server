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

        const userCollection = database.collection('user')

        app.post('/user', async (req, res) => {
            const query = req.body
            const result = await userCollection.insertOne(query)
            res.send(result)
        })

        app.get('/user', async (req, res) => {
            const query = req.query
            const result = await userCollection.find(query).toArray()
            res.send(result)
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