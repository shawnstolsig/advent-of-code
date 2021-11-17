const fs = require('fs');

const getDistro = (adapters) => {
    let one = Object.values(adapters).filter((val) => val === 1).length
    let two = Object.values(adapters).filter((val) => val === 2).length
    let three = Object.values(adapters).filter((val) => val === 3).length
    return {one, two, three}
}

const reduceAdapters = (adapters) => {
    let max = Math.max(Object.keys(adapters))
}

const getShorterAdapters = (adapters) => {
    let newObj = {}
    let keys = Object.keys(adapters)
        .map((el) => parseInt(el))
        .sort((a,b) => a-b)

    let loopCounter = keys.length
    for(let i = 0; i < loopCounter; i++){
        if(i === 0){

            if(keys[i] - 0 === 3){
                keys = keys.slice(0,i).concat(keys.slice(i+1).map(el => el-3))
                i--
                loopCounter--
                // console.log(`updated keys`, keys)

            } else {
                newObj[keys[i]] = 'not 3'
            }
        }
        else if(keys[i] - keys[i-1] === 3){
            keys = keys.slice(0,i).concat(keys.slice(i+1).map(el => el-3))
            i--
            loopCounter--
            // console.log(`updated keys`, keys)

        }
        else {
            newObj[keys[i]] = 'not 3'
        }
        if(i === loopCounter -1){
            end = keys[i]
        }
    }

    console.log('newObj is ',newObj)
    return newObj
}

var end
var answerCounter = 0
const tree = (adapters, current, end) => {

    console.log(`on`, current)
    if(parseInt(current) === parseInt(end)){
       console.log(`MADE IT TO THE END`)
        answerCounter++
        // console.log(answerCounter)
        return 1
    } //else {console.log(`not at end`)}

    let routes = []

    if(adapters[current+1]){
        routes.push(current+1)
    }
    if(adapters[current+2]){
        routes.push(current+2)
    }
    if(adapters[current+3]){
        routes.push(current+3)
    }

    routes.forEach((route) => {
        return tree(adapters, route, end)
    })

    // console.log(`NOWHERE TO GO`)
    return 0
}

const main = async () => {

    let data = fs.readFileSync('test.txt', 'utf-8');
    // let data = fs.readFileSync('test2.txt', 'utf-8');
    // let data = fs.readFileSync('input.txt', 'utf-8');
    let input = data.trim().split('\n');

    // PART 1
    console.log(`Part 1:`)
    let adapters = {}
    input.forEach((adapter) => {
        adapters[adapter] = false
    })

    let adaptArr = input.map((el) => parseInt(el))
    adaptArr.push(0)
    adaptArr.sort((a,b) => a-b)
    adaptArr.push(adaptArr[adaptArr.length-1] + 3)
    end = adaptArr[adaptArr.length-1]

    for(let i = 0; i < adaptArr.length-1; i++){
        if(adaptArr[i+1] - adaptArr[i] === 3){
            adapters[adaptArr[i+1].toString()] = 3
        } else if (adaptArr[i+1] - adaptArr[i] === 2){
            adapters[adaptArr[i+1].toString()] = 2
        } else if (adaptArr[i+1] - adaptArr[i] === 1){
            adapters[adaptArr[i+1].toString()] = 1
        }
    }

    let distro = getDistro((adapters))
    console.log(distro)
    console.log(`Answer is: ${distro.three * distro.one} `)

    // PART 2
    console.log(`Part 2:`)
    console.log(`end is`, end)
    console.log(`adapters is `, adapters)
    // let shortened = getShorterAdapters(adapters)
    // tree(shortened, 0, end)
    tree(adapters, 0, end)
    console.log(`done with recursion, answer is`, answerCounter)
};


main();