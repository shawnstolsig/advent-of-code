const fsPromise = require('fs/promises');

const getInputData = (filename) => {
    return fsPromise.readFile(filename, 'utf-8');
};

const main = async () => {

    // get input data string
    // let filename = 'test2.txt';
    let filename = 'input.txt';
    let data = await getInputData(filename);

    // trim whitespace and convert to array
    let stringArr = data.split('\n');

    /**
     * Part 1
     */
    console.log('Part 1:');

    console.log(stringArr.filter((x) => x === '').length)


    let pushRow = [];
    let pairArr = [];
    for(let i = 0; i < stringArr.length; i++){
        if(stringArr[i] === ''){
            pairArr.push(pushRow);
            pushRow = []
        } else {
            stringArr[i].split(' ').forEach((pair) => pushRow.push(pair))
        }
    }

    let passportArr = pairArr.map((pairs) => {
        let obj = {}
        pairs.forEach((pair) => {
            let key = pair.slice(0,3);
            let value = pair.slice(4)
            obj[key] = value;
        })
        return obj
    })
    let counter = 0;
    passportArr.forEach((p) => checkPassport(p) ? counter++ : null)
    console.log(`There are ${counter} valid passports.`)

    /**
     * Part 2
     */
    console.log(`Part 2:`);
    counter = 0;
    passportArr.forEach((p) => checkPassportPart2(p) ? counter++ : null)
    console.log(`There are ${counter} valid passports.`)

};

const checkPassport = (passport) => {
    const {byr, iyr, eyr, hgt, hcl, ecl, pid, cid} = passport
    return !!byr && !!iyr && !!eyr && !!hgt && !!hcl && !!ecl && !!pid
}

const checkPassportPart2 = (passport) => {

    // check to make sure all required fields exist, return false if they don't
    if (!checkPassport(passport)) return false;


    /*
    RULES:
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
     */

    // years
    let byr = parseInt(passport.byr);
    let iyr = parseInt(passport.iyr);
    let eyr = parseInt(passport.eyr);
    byr >= 1920 && byr <= 2002 ? byr = true : byr = false;
    iyr >= 2010 && iyr <= 2020 ? iyr = true : iyr = false;
    eyr >= 2020 && eyr <= 2030 ? eyr = true : eyr = false;

    // height
    let hgt = false;
    let re = /\d+/g;
    let matches = passport.hgt.match(re)
    if(!matches) {
        return false;
    }
    let heightAmount = parseInt(matches[0]);

    re = /[a-z]+/g;
    matches = passport.hgt.match(re)
    if(!matches) {
        return false;
    }
    let heightUnit = matches[0]

    if(heightUnit === 'cm'){
        if(heightAmount >= 150 && heightAmount <= 193) hgt = true;
    } else if (heightUnit === 'in'){
        if(heightAmount >= 59 && heightAmount <= 76) hgt = true;
    }

    // hair color
    let hcl = false;
    re = /#[0-9a-f]{6}/g;
    matches = passport.hcl.match(re)
    if(matches && matches.length === 1) hcl = true;

    // eye color
    let ecl = false
    let allowed = ['amb','blu','brn','gry','grn','hzl','oth'];
    let filterResults = allowed.filter((el) => passport.ecl === el)
    if(filterResults.length === 1) ecl = true;

    // passport id
    let pid = false;
    re = /^[0-9]{9}$/g;
    matches = passport.pid.match(re)
    if(matches && matches.length === 1) pid = true;

    return byr && iyr && eyr && hgt && hcl && ecl && pid
}


main();

