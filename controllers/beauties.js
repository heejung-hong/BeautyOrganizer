/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/beauties`
---------------------------------------------------------------------------------------
*/


/* 1.7.1 Require modules allows us to add routes
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* 1.7.1 info from models is pulled into db.
--------------------------------------------------------------- */
const db = require('../models')
const beauties = require('../models/seed')
const beauty = require('../models/beauty')


/* 1.7.1 Routes
--------------------------------------------------------------- */
// 1.7.1 Index Route (GET/Read): Will display all beauties
router.get('/', function (req, res) {
    db.Beauty.find({})
        // .then(beauties => res.json(beauties))
        // 1.11.2 refactor code to render from ejs file
        .then(beauties => {
            res.render('beauty-index', { // renders from ejs file
                beauties: beauties
            })
        })
})


// 1.7.1 Show Route (GET/Read): Will display an individual beauty document
// 1.7.1 using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Beauty.findById(req.params.id)
        // .then(beauty => res.json(beauty))
        // 1.11.2 refactor code to render from ejs file
        .then(beauty => {
            res.render('beauty-details', { // renders from ejs file
                beauty: beauty
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* 1.7.1 Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
