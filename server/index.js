
console.log("HEALLO WORLD")
// imports here for express and pg
const pg = require("pg"); // import postgres
const client = new pg.Client(process.env.DATABESE_URL || 'postgres://localhost/acme_notes_db')
const express = require('express');
const app = express();
const path = require("path");//final create absolute path

app.use('/assets', express.static(path.join(__dirname,'../client/dist/assets')));
// static routes here (you only need these for deployment)
app.get('/',(req,res) => res.sendFile(path.join(__dirname,'../client/dist/index.html')));
// app routes here
app.get('/api/note',async(req,res,next)=>{
  try{
    const SQL =`
    SELECT *
    FROM note
    `;
      const response = await client.query(SQL);
      res.send(response.rows);
  }catch(ex){
      
      next(ex);
  }
    console.log("app for get request, respond, ntst");
})
// create your init function

// init function invocation
const init = async()=>{
    console.log("connecting to DATABASE");
    await client.connect();
    console.log("connected to DATABASE" );
    
    let SQL =`
    DROP TABLE IF EXISTS note;
    CREATE TABLE note(
    id SERIAL PRIMARY KEY,
    txt VARCHAR(255),
    starred BOOLEAN DEFAULT FALSE
    );
    INSERT INTO note(txt) VALUES('learn express');
    INSERT INTO note(txt, starred) VALUES('write SQL queries', true);
    INSERT INTO note(txt, starred) VALUES('create routes', false);
    `;

    console.log("if note TABLE is exists" );
    console.log("TABLE created name note" );
    console.log("id created !no q" );
    console.log("txt VARCHAR(value) variable character" );
    console.log("Boolean false for beginning" );
    
    
    await client.query(SQL);
    console.log("data seeded");
    console.log("insert (txt, starred ) values('text', boolean); line 1  ");
    
    const port = process.env.PORT || 3000;
    
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
        console.log("app. needed express to comunicated")
        console.log(`curl localhost:${port}/api/note`)
        console.log(`curl for checking status of port`)
    });
}

init()