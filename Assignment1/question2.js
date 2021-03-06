const fetch = require('node-fetch')

value = "node"

process()

function get_url(url) {
    var patt = /{.*}/g;
    url = url.replace(patt, "");
    return url;
}

function get_data(url) {
    return fetch(url).then(res => res.json()).then(data => data)
}

async function process() {
    let res = []
    let data = await fetch("https://api.github.com/search/repositories?q=" + value).then(res => res.json()).then(json => json.items).catch(err => console.error(err))
    for (let element of data) {
        let temp = {};
        temp.name = element.name;
        temp.full_name = element.full_name;
        temp.private = element.private;
        let owner = {};
        owner.login = element.owner.login
        temp.owner = owner
        temp.licenseName = element?.license?.name
        temp.score = element.score
        //owner.name = get_data(element.owner.url)
        // owner.followersCount = get_data(element.owner.followers_url)
        //owner.following_url = get_data(element.owner.following_url)
        //temp.numberOfBranch = get_data(element.branches_url)
        let td = await Promise.all([get_data(element.owner.url).then(data => data.name), get_data(element.owner.followers_url).then(data => data.length), get_data(element.owner.following_url).then(data => data.length), get_data(element.branches_url).then(data => data.length)]).catch(err => console.error(err))
        owner.name = td[0]
        owner.followersCount = td[1]
        owner.followingCount = td[2]
        temp.numberOfBranches = td[3]
        res.push(temp)
    }
    console.log(res)
}
