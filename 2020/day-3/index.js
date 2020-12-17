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

    // create 2D array of the hill
    let hill = stringArr.map((row) => row.split(''))

    /**
     * Part 1
     */
    console.log('Part 1:');
    console.log(`You hit ${getTrees(hill, 3, 1)} trees.`)


    /**
     * Part 2
     */
    console.log(`Part 2:`);
    let oneOne = getTrees(hill, 1, 1);
    let threeOne = getTrees(hill, 3, 1);
    let fiveOne = getTrees(hill, 5, 1);
    let sevenOne = getTrees(hill, 7, 1);
    let oneTwo = getTrees(hill, 1,2);
    let product = oneOne * threeOne * fiveOne * sevenOne * oneTwo;

    console.log(`Product is ${product}`)

};

const getTrees = (hill, xSpeed, ySpeed) => {
    // track position
    let x = 0;
    let y = 0;

    // tree counter
    let treeCounter = 0;

    while(y < hill.length){

        // check for tree
        if(hill[y][x] === '#'){
            treeCounter++;
        }
        // move
        x += xSpeed;
        y += ySpeed;

        // wrap around if you go past the edge, to simulate repeating pattern
        x = x % hill[0].length

    }
    return treeCounter;
}

main();

