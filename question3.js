const fetch = require('node-fetch')

process()

async function process() {
    let data = await fetch("http://api.nobelprize.org/v1/prize.json").then(res => res.json()).then(json => json.prizes).catch(err => console.error(err))
    let res = []
    data.forEach(element => {
        if (element.year >= 2000 && element.year <= 2019) {
            if (element.category.trim() == "chemistry") {
                element.laureates.forEach(des => {
                    res.push({
                        "firstname": des.firstname,
                        "surname": des.surname
                    })
                })
            }
        }
    })
    console.log(res)
}