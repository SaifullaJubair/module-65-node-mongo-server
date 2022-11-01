const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const prot = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

//user name: module-65
//pass: pHdYVgMOaxRNNWrf


const uri = "mongodb+srv://module-65:pHdYVgMOaxRNNWrf@cluster0.1l4zbuv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//async await
async function run() {
   try {
      const userCOllection = client.db('module-65-node-mongodb-curd').collection('users')

      app.get('/users', async (req, res) => {
         const query = {}
         const cursor = userCOllection.find(query);
         const users = await cursor.toArray()
         res.send(users)
      })

      app.post('/users', async (req, res) => {
         const user = req.body
         console.log(user);
         const result = await userCOllection.insertOne(user);
         res.send(result);
      })

      app.delete('/users/:id', async (req, res) => {
         const id = req.params.id;
         //delete korar jonno khub e carefully query theke specify kore bolte hobe which one i want to delete. mongodb te id ta object akare tahke tai ObjectId() import korte hobe..

         const query = { _id: ObjectId(id) }
         // console.log('trying to delete data', id)
         const result = await userCOllection.deleteOne(query)
         console.log(result);
         res.send(result)
      })
   }
   finally {

   }
}
run().catch(err => console.log(err));
app.get('/', (req, res) => {
   res.send('Hello form node mongo server')
})
app.listen(prot, () => {
   console.log(`Listening to port ${prot}`);
})