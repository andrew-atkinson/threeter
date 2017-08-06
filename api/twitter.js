const Twit = require('twit')
const config = require('../config')
const Tweet = require('../db/tweets')
const Sequelize = require('sequelize')

var T = new Twit(config)

var stream = T.stream('statuses/filter', {
    track: 'Trump',
    geo_enabled: true
})

stream.on('tweet', function (tweet) {
    if (tweet.place) Tweet.findOrCreate({
        where: {
            name: tweet.user.name,
            user_id: tweet.user.id_str,
            user_screen_name:tweet.user.screen_name,
            text: tweet.text,
            id_str: tweet.id_str,
            place_id: tweet.place.id,
            place_name:tweet.place.name,
            place_country:tweet.place.country,
            place_bounding_box_coordinates:tweet.place.bounding_box.coordinates,
            in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
            in_reply_to_user_id_str: tweet.in_reply_to_user_id_str
        }
    })
    if (tweet.place) console.log(tweet)
})


// var reTweet = T.get('collections/list', 'tweet_id/894161161393848320', (err, data, reponse)=>{
//     console.log(data)
// })


module.exports = { T }
