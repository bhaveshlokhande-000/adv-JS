const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");
const { receiveMessageOnPort } = require("worker_threads");


fs.readFile("./battles.json", "utf-8", function (err, data) {
    process(JSON.parse(data))
});

function process(data) {
    let attacker_king = new Map();
    let defender_king = new Map();
    let nr = new Map();
    let win = 0;
    let loss = 0;
    let battle_types = new Set();
    let defender_size_acc = 0;
    let defender_size_min = 0;
    let defender_size_max = 0;
    let ak_name = "";
    let dk_name = "";
    data.forEach(element => {
        ak_name = element["attacker_king"].trim();
        dk_name = element["defender_king"].trim();
        let defender_size = element["defender_size"];
        let attacker_outcome = element["attacker_outcome"].trim()
        let battle_type = element["battle_type"];
        if (!attacker_king.has(ak_name)) {
            if (ak_name != "") {
                attacker_king.set(ak_name, 1);
            }
        } else {
            attacker_king.set(ak_name, attacker_king.get(ak_name) + 1);
        }

        if (!defender_king.has(dk_name)) {
            if (dk_name != "") {

                defender_king.set(dk_name, 1);
            }
        } else {
            defender_king.set(dk_name, defender_king.get(dk_name) + 1);
        }

        if (ak_name != "" && dk_name != "") {
            let key = ak_name + "#" + dk_name;
            if (!nr.has(key)) {
                nr.set(key, {
                    name: element["name"],
                    region: element["region"]
                });
            }
        }

        if (attacker_outcome != "")
            if (attacker_outcome == "win")
                win += 1;
            else
                loss += 1;

        if (battle_type != "")
            battle_types.add(battle_type);

        defender_size_acc += defender_size || 0
        if (defender_size_min < defender_size)
            defender_size_min = defender_size
        if (defender_size_max > defender_size)
            defender_size_max = defender_size

    });

    let max = 0;
    for (let entry of attacker_king) {
        let count = entry[1]
        if (count > max) {
            max = count
            ak_name = entry[0]
        }
    }

    max = 0;
    for (let entry of defender_king) {
        let count = entry[1]
        if (count > max) {
            max = count
            dk_name = entry[0]
        }
    }

    nr = nr.get(ak_name + "#" + dk_name);

    let res = {
        'most_active': {
            'attacker_king': ak_name,
            'defender_king': dk_name,
            'region': nr["region"],
            'name': nr["name"]
        },
        'attacker_outcome': {
            'win': win, // total win
            'loss': loss // total loss
        },
        'battle_type': Array.from(battle_types), // unique battle types
        'defender_size': {
            'average': defender_size_acc / data.length,
            'min': defender_size_min,
            'max': defender_size_max
        }
    }

    console.log(res)
}



