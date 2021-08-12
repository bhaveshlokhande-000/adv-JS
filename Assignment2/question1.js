const fetch = require('node-fetch')
const { title } = require('process')

process()

function get_json(obj) {
    let temp = []
    for (let key in obj) {
        temp.push({
            "name": key,
            "movies": obj[key]
        })
    }
    console.log(temp)
    return temp
}

async function process() {
    let data = await fetch("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json").then(res => res.json()).catch(err => console.error(err))

    let actors = {}
    let genres = {}
    data.forEach(element => {
        element.cast.forEach(name => {
            let tn = name;
            if (!(tn in actors)) {
                actors[tn] = []
                actors[tn].push(element.title)
            } else {
                actors[tn].push(element.title)
            }
        })

        element.genres.forEach(type => {
            let tg = type;
            if (!(tg in genres)) {
                genres[tg] = []
                genres[tg].push(element.title)
            } else {
                genres[tg].push(element.title)
            }
        })
    })

    let res = {
        actors: get_json(actors),
        Genres: get_json(genres)
    }
    console.log(res)
}
