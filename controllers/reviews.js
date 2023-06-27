/* 3.3.2 Build Routes, Test with Postman
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/reviews`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All Reviews): 
// GET localhost:3000/reviews/
router.get('/', (req, res) => {
	db.Beauty.find({}, { reviews: true, _id: false })
        .then(beauties => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let beauty of beauties) {
	        	flatList.push(...beauty.reviews)
	    	}
	    	res.json(flatList)
		}
	)
});

// New Route: GET localhost:3000/reviews/new
router.get('/new/:beautyId', (req, res) => {
    res.send('You\'ve reached the new route. You\'ll be making a new review for beauty item ' + req.params.beautyId)
})

// Create Route: POST localhost:3000/reviews/
router.post('/create/:beautyId', (req, res) => {
    db.Beauty.findByIdAndUpdate(
        req.params.beautyId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(review => res.json(review))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.Beauty.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(beauty => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json(beauty.reviews[0])
        })
});

// Edit Route: GET localhost:3000/reviews/:id/edit
router.get('/:id/edit', (req, res) => {
    db.Beauty.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(beauty => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json('You\'ll be editing beauty ' + reviews._id)
        })
});


// Update Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.Beauty.findByIdAndUpdate(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(beauty => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json(beauty.reviews)
        })
});


// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.Beauty.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(beauty => res.json(beauty))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
