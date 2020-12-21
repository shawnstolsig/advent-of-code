const fs = require('fs');

const main = async () => {

    let input = fs.readFileSync('test.txt', 'utf-8');
    // let input = fs.readFileSync('input.txt', 'utf-8');
    let data = input.split('\n');

    // PART 1
    console.log(`Part 1:`)
    let rules = {};
    data.forEach((rule) => {
        let bag = rule.split('contain')[0].trim()
        let bagRules =
            rule.split('contain')[1]               // take everything after 'contain'
            .trim()                                         // remove whitespace
            .replaceAll('.','')      // remove trailing period
            .split(', ')

        bagRules.forEach((r) => {
            if(rules[bag]) console.log(`Rules already exist for this bag?`);
            let re = /\d+/g
            let bagCount = r.match(re)
            if(bagCount) bagCount = bagCount[0];
            console.log(bagCount)
        })

        console.log(bagRules)
    })


    // PART 2
    console.log(`Part 2:`)


};


main();