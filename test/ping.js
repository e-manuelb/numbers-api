const axios = require('axios');
var chai = require('chai');
var server = require('../server');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

async function request(url) {

    let response = await axios.get(url).then((r) => { return r }).catch((e) => { return e });

    let data = response.data;

    if (data == undefined) {
        return request(url)
    }

    if (response.data.numbers.length == 0) {
        return 0;
    }

    return response;
}

async function ping() {
    for (let n = 1; n < 10; n++) {
        url = `http://challenge.dienekes.com.br/api/numbers?page=${n}`
        let response = await request(url);
        console.log("Ping: " + n, " |", response.status)
        console.log("URL: " + url,)
    }
}

describe('Ping', function () {
    it('Ping', function (done) {

        ping().then(() => {
            done()
        })
    })
});