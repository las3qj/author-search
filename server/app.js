const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors({origin: true}));
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

const getGoogleBooks = async (url) => {
    try{
        return await axios.get(url).then(resp => resp.data.items).then(items => {
          const books = [];
          items.forEach(item => {
            let author = "Unknown";
            if(item.volumeInfo.authors !== undefined){
              author = item.volumeInfo.authors[0];
            }
            let image = "";
            if(item.volumeInfo.imageLinks !== undefined && item.volumeInfo.imageLinks.thumbnail !== undefined){
              image = item.volumeInfo.imageLinks.thumbnail;
            }
            books.push({title: item.volumeInfo.title, author, image, id: item.id, local: false});
          });
          return books;
        })
    } catch (error) {
        console.error(error);
    }
}

const getLocalBooks = async (title) => {
    const snapshot = await db.collection("books").get();
    const books = [];
    snapshot.forEach(doc => {
        const book = {...doc.data(), local: true, id: doc.id};
        if(book.title.toLowerCase() === title.toLowerCase()){
          books.push(book);
        }
    });
    return books;
}

app.get('/library', async (req, res) => {
    const snapshot = await db.collection("books").get();
    const books = [];
    snapshot.forEach(doc => {
        books.push({...doc.data(), id: doc.id});
    });
    res.json(books);
});

app.delete('/library', async (req, res) => {
  const snapshot = await db.collection("books").get();
  const id = req.query.id;
  db.collection("books").doc(id).delete().then(resp => res.sendStatus(200).end());
})

app.get('/search', async (req, res) => {
  const title = req.query.title;
  const myBooks = await getLocalBooks(title);
  const url = "https://www.googleapis.com/books/v1/volumes?q="+title;
  const googleBooks = await getGoogleBooks(url);
  let local = false;
  if(myBooks.length != 0) {
    myBooks.forEach(book => {
      const index = googleBooks.findIndex(b => b.id === book.id);
      if(index > -1) {
        googleBooks.splice(index, 1);
      }
    })
  }
  res.json({local, books: myBooks.concat(googleBooks)});
})

app.post('/search', async (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    const image = req.query.image;
    const book = {author, title, image};
    const id = req.query.id;
    db.collection("books").doc(id).set(book).then(resp => res.sendStatus(200).end());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
