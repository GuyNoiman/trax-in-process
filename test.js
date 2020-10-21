const fetch = require('node-fetch');
const URL = "http://localhost:3000";
const success = "OK";
const fail = "FAILURE";

async function test() {
    try {
        // whos-there
        let res = await fetch(URL + `/whos-there`, { method: 'GET' });
        let ans = await res.text();
        if (ans === "Hi Trax! This is Guy Noiman") console.log('whos-there', success);
        else console.log('whos-there', fail);
    } catch (error) {
        console.log(fail + " " + error);
    }
}

test();
    