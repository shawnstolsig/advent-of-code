const fsPromise = require('fs/promises');

const getInputData = (filename) => {
    return fsPromise.readFile(filename, 'utf-8');
};

const main = async () => {

    // get input data string
    let filename = 'input.txt';
    let data = await getInputData(filename);

    // trim whitespace and convert to array
    let stringArr = data.trim().split('\n');

    // convert each string to a number
    let numArr = stringArr.map((s) => parseInt(s));
    console.log(`There are ${numArr.length} items.`)
    /**
     * Part 1
     */
    console.log('Part 1:');

    // iterate through each number, find the differnece between it an 2020,
    // then see if that difference exists in the array
    numArr.forEach((num) => {
        let difference = 2020 - num;
        if(numArr.includes(difference)){
            console.log(`${num} * ${difference} = ${num * difference}`);
        };
    });

    /**
     * Part 2
     */
    console.log(`Part 2:`);

    // sort low to high
    // numArr.sort();

    for (let i = 0; i < numArr.length; i++){
        for (let j = 1; j < numArr.length; j++){
            for (let k = 2; k < numArr.length; k++){
                if(i === j || i === k || j === k){
                    continue;
                } else {
                    numArr[i] + numArr[j] + numArr[k] === 2020
                        ? console.log(`${numArr[i]} * ${numArr[j]} * ${numArr[k]} = ${numArr[i] * numArr[j] * numArr[k]}`)
                        : null;
                }
            };
        };
    };
};

main();