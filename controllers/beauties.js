/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/beauties`
---------------------------------------------------------------------------------------
*/


// 1.7.1 Require modules allows us to add routes
const express = require('express')
// Router allows us to handle routing outside of server.js
const router = express.Router()


// 1.7.1 info from models is pulled into db.
const db = require('../models')
const beauties = require('../models/seed')
const beauty = require('../models/beauty')


/* 1.7.1 Routes
--------------------------------------------------------------- */
// 1.7.1 Index Route (GET/Read): Will display all beauties items
router.get('/', function (req, res) {
    db.Beauty.find({})
        // .then(beauties => res.json(beauties))
        // 1.11.2 refactor code to render from ejs file
        .then(beauties => {
            res.render('beauties/beauty-index', { // renders from ejs file
                beauties: beauties
            })
        })
})

// 2.3.1 New Route (GET/Read): This route renders a form 
// 2.3.1 which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    // res.send('You\'ve hit the new route!')
    res.render('beauties/new-form') // renders from ejs file
})


// 1.7.1 Show Route (GET/Read): Will display an individual beauty document
// 1.7.1 using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Beauty.findById(req.params.id)
        // .then(beauty => res.json(beauty))
        // 1.11.2 refactor code to render from ejs file
        .then(beauty => {
            if (beauty) {
                res.render('beauties/beauty-details', { beauty: beauty }) 
                // renders from ejs file
            } else {
                res.render('404') // is not in beauty details page, render 404 page
            }
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})

// 2.3.2 Create Route (POST/Create): This route receives the POST request sent from the new route,
// 2.3.2 creates a new beauty document using the form data, 
// 2.3.2 and redirects the user to the new beauty's show page
router.post('/', (req, res) => {
    db.Beauty.create(req.body)
        // .then(beauty => res.json(beauty))
        .then(beauty => res.redirect('/beauties/' + beauty._id))
})

// 2.3.3 Edit Route (GET/Read): This route renders a form
// 2.3.3 the user will use to PUT (edit) properties of an existing beauty
router.get('/:id/edit', (req, res) => {
    db.Beauty.findById(req.params.id)
        // .then(beauty => res.send('You\'ll be editing beauty item ' + beauty._id))
        .then(beauty => res.render('beauties/edit-forms', { beauty: beauty }))
})


// 2.3.4 Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// 2.3.4 edits the specified pet document using the form data,
// 2.3.4 and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Beauty.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        // .then(beauty => res.json(beauty))
        .then(beauty => res.redirect('/beauties/' + beauty._id)) // redirected to show page
})

// 2.3.5 Destroy Route (DELETE/Delete): This route deletes a pet document 
// 2.3.5 using the URL parameter (which will always be the pet document's ID)
router.delete('/:id', (req, res) => {
    db.Beauty.findByIdAndRemove(req.params.id)
        // .then(beauty => res.send('You\'ve deleted beauty ' + beauty._id))
        .then(() => res.redirect('/beauties')) 
        // after deleted, client redirected to index route.
})




/* 1.7.1 Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
