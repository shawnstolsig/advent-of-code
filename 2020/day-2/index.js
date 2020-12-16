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
    console.log(`There are ${stringArr.length} items.`)

    /**
     * Part 1
     */
    console.log('Part 1:');
    let objArr = stringArr.map((el) => {

        // get min and max values
        let re = /\d+/g;
        const [min, max] = el.match(re);

        // get letter
        re = /[a-z]:/g
        const [letter] = el.match(re)[0]

        // turn password into sorted array of characters
        let colonIndex = el.indexOf(':')
        const password = el.slice(colonIndex+2)
        const sortedPasswordArr = el.slice(colonIndex+2).split('').sort()
        return {
            min,
            max,
            letter,
            sortedPasswordArr,
            password,
            indexOne: min-1,
            indexTwo: max-1
        }
    });

    let count = 0;

    objArr.forEach(({min, max, letter, sortedPasswordArr}) => {

        let letterCount = 0;
        let i = sortedPasswordArr.indexOf(letter);
        if(i === -1){
            // do nothing
        } else {
            while(sortedPasswordArr[i] === letter){
                letterCount++
                i++
            }
            letterCount >= min && letterCount <= max ? count++ : null;
        }
    })
    console.log(`${count} passwords meet the criteria.`)

    /**
     * Part 2
     */
    console.log(`Part 2:`);

    count = 0;
    objArr.forEach(({indexOne, indexTwo, password, letter}) => {
        if(password[indexOne] === letter && password[indexTwo] !== letter){
            count++
        } else if (password[indexOne] !== letter && password[indexTwo] === letter){
            count++
        }
    })
    console.log(`${count} passwords meet the criteria.`)

};

main();