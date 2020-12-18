const fsPromise = require('fs/promises');

const getInputData = (filename) => {
    return fsPromise.readFile(filename, 'utf-8');
};

const main = async () => {

    // get input data string
    // let filename = 'test.txt';
    let filename = 'input.txt';
    let data = await getInputData(filename);

    // trim whitespace and convert to array
    let stringArr = data.trim().split('\n');

    /**
     * Part 1
     */
    console.log('Part 1:');
    let maxId = 0;
    let foundTickets = []
    stringArr.forEach((el) => {
        let rowInfo = el.slice(0,7)
        let colInfo = el.slice(7)
        let row = findRow(0,127,rowInfo)
        let col = findRow(0,7,colInfo)
        let id = row * 8 + col;
        foundTickets.push(id)
        if(id > maxId) maxId = id;
    })
    console.log(`The highest id is ${maxId}.`)


    /**
     * Part 2
     */
    console.log(`Part 2:`);
    // look through found tickets and find which are missing one of the adjacent seats
    let possiblities = []
    foundTickets.forEach((ticket) => {
        if(!foundTickets.includes(ticket-1) || !foundTickets.includes(ticket+1)){
            possiblities.push(ticket)
        }
    })
    console.log('Possibilities are',possiblities)

};

main();


const findRow = (min, max, str) => {
    // console.log(`min: ${min} max: ${max} str: ${str}`)
    // base case
    if(str.length === 1){
        if(str === 'F' || str === 'L') return min;
        else return max;
    }

    // pop off first character
    let char = str[0]

    // check to see if front or back
    if(char === 'F' || char === 'L'){
        return findRow(min, getMedian(min, max, char), str.slice(1))
    }
    return findRow(getMedian(min, max, char), max, str.slice(1))

}

const getMedian = (min, max, char) => {
    let difference = max - min;
    if(char === 'B' || char === 'R') return Math.ceil(difference / 2 ) + min;
    return Math.floor(difference / 2) + min;
}
