const db = require('./db')
const Tweets = require('./db/tweets')

const seed = () =>
    Promise.all(tweets.map(tweet =>
        Tweets.create(tweet))
    )

const main = () => {
    console.log('Syncing db...')
    db.sync({ force: true })
        .then(() => {
            console.log('Seeding databse...')
            return seed()
        })
        .catch(err => {
            console.log('Error while seeding')
            console.log(err.stack);
        })
        .then(() => {
            db.close();
            return null
        })
}