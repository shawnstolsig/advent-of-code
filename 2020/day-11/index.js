const fs = require('fs');

const findSeats = (seats, symbol) => {
    let selectedSeats = []
    for(let i = 0; i < seats.length; i++){
        for(let j = 0; j < seats[i].length; j++){
            if(seats[i][j] === symbol){
                selectedSeats.push([i,j])
            }
        }
    }
    return selectedSeats
}

const findSeatsToFill = (seats) => {
    let selectedSeats = []
    for(let i = 0; i < seats.length; i++){
        for(let j = 0; j < seats[i].length; j++){

            // top row seats



        }
    }
    return selectedSeats
}

const isEmpty = (seats, i,j) => {
    return seats[i][j] === '#'
}

const isSeat = (seats, i, j) => {
    return seats[i][j] === 'L' || seats[i][j] === '#'
}

const countNeighbors = (seats, i, j) => {
    // get all adjacent locations
    let adjacentLocations = [
        [i-1, j-1],
        [i-1, j],
        [i-1, j+1],
        [i+1, j-1],
        [i+1, j],
        [i+1, j+1],
        [i, j+1],
        [i, j-1]
    ]

    // remove those out of range
    let validAdjacentLocations = adjacentLocations.map(([i,j]) => {
        if(i >= 0 && i < seats.length && j >= 0 && j < seats[i].length) return [i,j];
    })

    let neighborCount = 0
    validAdjacentLocations.forEach((location) => {
        // PICK UP HERE...isSeat?  isEmpty?  increment count, then return it

    })
}

const main = async () => {

    let data = fs.readFileSync('test2.txt', 'utf-8');
    // let data = fs.readFileSync('test.txt', 'utf-8');
    // let data = fs.readFileSync('input.txt', 'utf-8');
    let input = data.trim().split('\n');

    // PART 1
    console.log(`Part 1:`)
    let seats = input.map((row) => row.split(''))



    console.log(findSeats(seats, 'L'))
    // PART 2
    console.log(`Part 2:`)

};


main();