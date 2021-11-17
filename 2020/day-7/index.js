const fs = require('fs');

const findOuterBag = (inverseRules, possibleOuterBags, innerBag) => {
    let outerBagPossibilities = inverseRules[innerBag];
    if(!outerBagPossibilities){
        return possibleOuterBags
    }
    outerBagPossibilities.forEach((bag) => {
        if(!possibleOuterBags.includes(bag)){
            possibleOuterBags.push(bag);
            return findOuterBag(inverseRules, possibleOuterBags, bag);
        }
    })
    return possibleOuterBags
}

const countInnerBags = (rules, bag) => {
    // lookup rules for bag
    let thisBagRules = rules[bag]

    // check to see if bag is dead end
    if(Object.keys(thisBagRules).length === 0){
        return 0
    }

    let loopArr = []

    // iterate through rules for bag
    for(let innerBag in thisBagRules){

        // figure out how many times to call function
        let loopCount = parseInt(thisBagRules[innerBag])

        for(let i = 0; i < loopCount; i++){
            loopArr.push(innerBag)
        }
    }

    // call function the specified number of
    let thisLevelBagCount = loopArr.length
    for(let b of loopArr){
        thisLevelBagCount +=  countInnerBags(rules, b)
    }

    return thisLevelBagCount
}


const main = async () => {

    // let input = fs.readFileSync('test2.txt', 'utf-8');
    let input = fs.readFileSync('input.txt', 'utf-8');
    let data = input.split('\n');

    // PART 1
    console.log(`Part 1:`)
    let rules = {};
    data.forEach((rule) => {
        let bag = rule.split('contain')[0].replaceAll('bags', '').replaceAll('bag','').trim()
        let bagRules =
            rule.split('contain')[1]               // take everything after 'contain'
            .trim()                                         // remove whitespace
            .replaceAll('.','')      // remove trailing period
            .split(', ')

            let thisBagsRules = {}
        bagRules.forEach((r) => {
            if(rules[bag]) console.log(`Rules already exist for this bag?`);
            let re = /\d+/g
            let bagCount = r.match(re)
            let bagType
            if(bagCount) {
                bagCount = bagCount[0];
                if(bagCount > 9) bagType = r.slice(1);
                else bagType = r.slice(2);
                bagType = bagType.replaceAll('bags', '').replaceAll('bag', '').trim();
                thisBagsRules[bagType] = bagCount
            }

        })
        rules[bag] = thisBagsRules
    })
    let inverseRules = {}
    for(let outerBag in rules){
        Object.keys(rules[outerBag]).forEach((bag) => {
            if(!inverseRules[bag]){
                inverseRules[bag] = [outerBag]
            } else {
                if(!inverseRules[bag].includes(outerBag)) inverseRules[bag].push(outerBag)
            }
        })
    }
    let bagToCheck = 'shiny gold'
    let possibleOuterBags = findOuterBag(inverseRules, [], bagToCheck)
    // console.log(`[${possibleOuterBags}] can potentially hold ${bagToCheck}.  Count is ${possibleOuterBags.length}`)
    console.log(`${possibleOuterBags.length} bags can hold a ${bagToCheck}`)
    // PART 2
    console.log(`Part 2:`)

    console.log('Answer is ', countInnerBags(rules, bagToCheck))

};

main();

