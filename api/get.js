const router = require('express').Router()
const mime = require('mime')
const Tweet = require('../db/tweets')

router.get('/', function (req, res, next) {
    Tweet.findAll()
        .then(tweets => res.json(tweets))
        .catch(next)
})

module.exports = router

