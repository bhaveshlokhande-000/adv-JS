const fetch = require('node-fetch')

process()

async function process() {
    let data = await fetch("https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json").then(res => res.json()).then(json => json).catch(err => console.error(err))
    let res = data.map(element => {
        let temp = element.Statistics.Flights
        return {
            "airport": element.Airport.Name,
            "result": temp.Cancelled + temp.Delayed + temp.Diverted + temp["On Time"] === temp.Total
        }
    })
    console.log(res)
}