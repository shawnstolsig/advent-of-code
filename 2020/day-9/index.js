const fs = require('fs');

const getPreamble = (input, length, index) => {
    return input.slice(index-length,index).map((el) => parseInt(el))
}

const sumArr = (arr) => {
    let sum = arr.reduce((acc, curr) => acc + parseInt(curr), 0)
    // console.log('checking sum of arr: ', arr, sum)
    return sum
}

const findWeakness = (arr) => {
    let sorted = arr.sort()

    return sorted[0] + sorted[sorted.length-1]
}



const main = async () => {

    // let data = fs.readFileSync('test2.txt', 'utf-8');
    let data = fs.readFileSync('input.txt', 'utf-8');
    let input = data.trim().split('\n');
    input = input.map((el) => parseInt(el))

    // PART 1
    console.log(`Part 1:`)
    let preambleLength = 25

    let failingNumber

    for(let i = preambleLength; i < input.length; i++){
        let preamble = getPreamble(input, preambleLength, i)
        let flag = false
        for (let p of preamble){
            let difference = input[i] - p
            if(preamble.includes(difference)){
                flag = true
            }
        }
        // console.log(preamble)
        if(flag){
            // console.log(`${input[i]} passes`)
        } else {
            failingNumber = parseInt(input[i])
        }
    }
    console.log(`${failingNumber} fails`)

    // PART 2
    console.log(`Part 2:`)
    failingNumber = 31161678
    let sol
    for(let i = 0; i < input.length; i++){
        let arr = []
        if(input[i] >= failingNumber){
            // console.log(`Exceeded failing number, skipping`)
        }
        else {
            for(let j = i; j < input.length; j++){
                let sum = sumArr(arr)
                if(sum < failingNumber){
                    arr.push(input[j])
                }
                else if (sum === failingNumber){
                    // console.log(`Found solution: `, arr)
                    sol = arr
                }
                else if (sum > failingNumber){
                    j = input.length
                }
            }
        }
    }
    // console.log(`Sums to failingNumber: `, sol)
    console.log(`Solution is `, findWeakness((sol)))
};


main();