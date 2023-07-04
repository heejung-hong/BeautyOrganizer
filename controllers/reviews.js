/* 3.3.2 Build Routes, Test with Postman
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/reviews`
---------------------------------------------------------------------------------------
*/


// Require modules
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


// Require the db connection, and models
const db = require('../models')


// Routes
// Index Route (All Reviews): 
// GET localhost:3000/reviews/
router.get('/', (req, res) => {
	db.Beauty.find({})
    // .populate({path: "reviews", populate: [ {path: "reviewDescription"}, {path: "reviewDate"}]})
        .then(beauties => {
            console.log(beauties)
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let beauty of beauties) { 
                // console.log(beauty)
                if (beauty.reviews.length > 0) {
                    flatList.push(beauty)
                }
            }
	    	// res.json(flatList)
            res.render('reviews/review-index', { apps: flatList, beauty: beauties })
		})
});
/*
router.get('/', (req, res) => {
	db.Beauty.find({}, { reviews: true, _id: false })
        .then(beauties => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let beauty of beauties) { flatList.push(...beauty.reviews) }
	    	// res.json(flatList)
            res.render('reviews/review-index', { apps: flatList })
		})
});
*/
// New Route: GET localhost:3000/reviews/new/:beautyId
router.get('/new/:beautyId', (req, res) => {
    // res.send('You\'ve reached the new route. You\'ll be making a new review for beauty item ' + req.params.beautyId)
    db.Beauty.findById(req.params.beautyId)
        .then(beauty => {
            if (beauty) {
                res.render('reviews/new-form.ejs', { beauty: beauty })
            } else {
                res.render('404')
            }
        })
})

// Create Route: POST localhost:3000/reviews/
router.post('/create/:beautyId', (req, res) => {
    db.Beauty.findByIdAndUpdate(
        req.params.beautyId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        // .then(review => res.json(review))
        .then(() => res.redirect('/beauties/' + req.params.beautyId))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.Beauty.findOne(
        { 'reviews._id': req.params.id },
        // { 'reviews.$': true, _id: false }
    )
        .then(beauty => {
            console.log(beauty.reviews[0])
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            // res.json(beauty.reviews[0])
            res.render('reviews/review-details', { app: beauty.reviews[0], beauty: beauty })
        })
});

// Edit Route: GET localhost:3000/reviews/:id/edit
router.get('/:id/edit', (req, res) => {
    db.Beauty.findOne(
        { 'reviews._id': req.params.id }
    )
        .then(beauty => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            // res.json(beauty)
            res.render('beauties/beauty-index', {
                beauties: beauties
            })
        })
});


// Update Route: GET localhost:3000/reviews/:id
router.put('/:id', (req, res) => {
    db.Beauty.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $set: { 'reviews.$': req.body }},
        { new: true }
    )
        .then(beauty => {
            console.log(beauty)
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            // res.json(beauty.reviews)
            res.render('reviews/review-details', { app: beauty.reviews[0] })
        })
});



// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.Beauty.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        // .then(beauty => res.json(beauty))
        .then(beauty => res.redirect('/beauties/' + beauty._id))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
