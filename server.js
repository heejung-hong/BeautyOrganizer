
/* 1.5.1 Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

/* 1.5.1 Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* 1.7.3 Require the routes in the controllers folder
--------------------------------------------------------------- */
const beautiesCtrl = require('./controllers/beauties')

/* 1.5.1 Create the Express app
--------------------------------------------------------------- */
const app = express();

/* 1.5.1 Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // 1.5.1 wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


/* 1.5.1 Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



/* 1.5.1 Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());


/* 1.5.1 Mount routes looks into beauties controller
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.send('Project-2')
});

// 1.6.3 When a GET request is sent to `/seed`, the beauties collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing beauties
    db.Beauty.deleteMany({})
        .then(removedBeauties => {
            console.log(`Removed ${removedBeauties.deletedCount} beauties`)
            // Seed the beauties collection with the seed data
            db.Beauty.insertMany(db.seedBeauties) // db refering to models folder
                .then(addedBeauties => {
                    console.log(`Added ${addedBeauties.length} beauties to be used`)
                    res.json(addedBeauties)
                })
        })
});


// 1.7.4 This tells our app to look at the `controllers/pets.js` file 
// 1.7.4 to handle all routes that begin with `localhost:3000/pets`
app.use('/beauties', beautiesCtrl)  // this is middleware that stores extra routes in beauties controller



/* 1.5.1 Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
