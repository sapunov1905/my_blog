const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
   console.log("DB connected!");
})

const postsRouter = require('./routes/posts');

app.use('/posts', postsRouter);

app.listen(port, () => {
   console.log(`Server has been started on port: ${port}`);
});