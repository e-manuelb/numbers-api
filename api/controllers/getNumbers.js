const axios = require('axios');
const fs = require('fs');

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

async function getNumbersAndOrder() {
    console.time("Total run time")
    let n = 1
    let url = `http://challenge.dienekes.com.br/api/numbers?page=${n}`;
    let array = [];

    console.time("Time to get the array of numbers")
    for (let response = await request(url); response.status = 200; n++) {
        url = `http://challenge.dienekes.com.br/api/numbers?page=${n}`
        let response = await request(url);


        if (response == 0) {
            break
        }

        console.log("Page number: " + n, " |", response.status)

        response.data.numbers.forEach(num => {
            array.push(num);
        });

    }

    console.timeEnd("Time to get the array of numbers")

    console.time("Array organization time")
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < array.length; i += 1) {
            if (array[i - 1] > array[i]) {
                done = false;
                var tmp = array[i - 1];
                array[i - 1] = array[i];
                array[i] = tmp;
            }
        }
    }

    console.timeEnd("Array organization time")

    let obj = {
        numbers: array
    }

    let json = JSON.stringify(obj);

    fs.writeFileSync('./api/data/numbers.json', json);

    console.log("===========================================================================================================");
    console.log("Array has been sorted.")
    console.log(array);
    console.log("===========================================================================================================");
    console.timeEnd("Total run time")

}

module.exports = getNumbersAndOrder;
