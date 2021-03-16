const categories = [
    { name: 'Percussion instruments' },
    { name: 'Wind instruments' },
    { name: 'Stringed instruments' },
    { name: 'Electronic instruments' },
    { name: 'Accessories' },
    { name: 'Electronics' },
    { name: 'Headphones' },
    { name: 'Cameras' },
    { name: 'Laptops' },
    { name: 'Food' }
];

const sortCategories = categories.sort(function (a, b) {
    var categoryA = a.name.toUpperCase();
    var categoryB = b.name.toUpperCase();
    if (categoryA < categoryB) {
        return -1;
    }
    else if (categoryA > categoryB) {
        return 1;
    }
    return 0;
});

// console.log(sortCategories)


const categories2 = [
    'Percussion instruments',
    'Wind instruments',
    'Stringed instruments',
    'Electronic instruments',
    'Accessories',
    'Electronics',
    'Headphones',
    'Cameras',
    'Laptops',
    'Food',
    'Fb'
];

const sortCategories2 = categories2.sort(function (a, b) {
    var categoryA = a.toUpperCase();
    var categoryB = b.toUpperCase();
    if (categoryA < categoryB) {
        return -1;
    }
    else if (categoryA > categoryB) {
        return 1;
    }
    return 0;
});

// console.log(sortCategories2)




const arrayForRandom = ['1', 2, '3', 4, '5'];
// function sortRandomly(array) {
//     array.ran
// }


var item = arrayForRandom[Math.floor(Math.random() * arrayForRandom.length)];

// console.log(item)


const avatarsArrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
const avatarRandomNumber = Math.floor(Math.random() * avatarsArrayNumbers.length);
// console.log(avatarRandomNumber)



// const string = "   essai de string"
// let words = [];
// const splitting = (str) => {
//     words = str.trim().split(" ")
//     return words
// }
// splitting(string)
// console.log(words)

const string = "   essai de string"
// let words = [];

const firstWord = string.trim().split(' ')[0]
// const splitting = (str) => {
//     words = str.trim().split(" ")
//     return words
// }
// splitting(string)
// console.log(firstWord)

function capitalize(value) {
    var textArray = value.split(' ')
    var capitalizedText = ''
    for (var i = 0; i < textArray.length; i++) {
        capitalizedText += textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1) + ' '
    }
    // console.log(capitalizedText)
    return capitalizedText
}

// capitalize(string)


// const capitalizeFirstName = (name) => {
//     let textArray = name.trim().split(' ');
//     let capitalizedFirstName = '';
//     capitalizedFirstName += textArray[0].charAt(0).toUpperCase() + textArray[0].slice(1);
//     console.log(capitalizedFirstName)
//     return capitalizedFirstName
// }

// capitalizeFirstName(string)


// const firstName = req.body.name.trim().split(' ')[0];
const nameInput = "   jesuistreslongcommemot suis un essai"
const nameInput2 = "   anticonstitutionnellement blabla"
const nameInput3 = "   christophe blabla"

const capitalizeFirstName = (name) => {
    let textArray = name.trim().split(' ');
    let firstWord = textArray[0];
    // console.log(firstWord)

    let firstWordWithoutFirstLetter = textArray[0].slice(1);
    // console.log(firstWordWithoutFirstLetter)

    let arrayFirstWordWithoutFirstLetter = firstWordWithoutFirstLetter.split('');
    // console.log(arrayFirstWordWithoutFirstLetter)

    let isArrayLengthLargerThanTen = arrayFirstWordWithoutFirstLetter.length > 11 ? true : false;
    // console.log('isArrayLengthLargerThanTen', isArrayLengthLargerThanTen)
    let cropedArrayFirstWord = arrayFirstWordWithoutFirstLetter.slice(0, 10)
    // console.log('cropedArrayFirstWord', cropedArrayFirstWord)

    let TenthFirstLetters = '';
    for (let i = 0; i < cropedArrayFirstWord.length; i++) {
        TenthFirstLetters += cropedArrayFirstWord[i]
    }
    // console.log('FourteenthFirstLetters', FourteenthFirstLetters)
    let points = ''
    isArrayLengthLargerThanTen ? points = '...' : null
    let capitalizedFirstName = '';
    capitalizedFirstName += textArray[0].charAt(0).toUpperCase() + TenthFirstLetters + points;
    // console.log('capitalizedFirstName', capitalizedFirstName)
    return capitalizedFirstName
}
// capitalizeFirstName(nameInput)
// console.log(capitalizeFirstName(nameInput2))



const myArray = [
    { name: 'Percussion instruments', price: 25 },
    { name: 'Wind instruments', price: 100 },
    { name: 'Stringed instruments', text: "blabla", price: 45 },
    { name: 'Electronic instruments', price: 67 },
    { name: 'Accessories', price: 98 },
    { name: 'Electronics', price: -25 },
    { name: 'Headphones', price: 75 },
    { name: 'Cameras' },
    { name: 'Laptops' },
    { name: 'Food', price: 100 }
];

const directFindingMaxPrice = (array) => {
    // var max = array.reduce(function (a, b) {
    //     return Math.max(a, b);
    // });
    // return max

    const max = array.sort((a, b) => b.price - a.price)[0];
    console.log('max', max)
    const maxPrice = max.price;
    console.log('maxPrice', maxPrice)

    console.log(typeof maxPrice)
    return maxPrice
}

const findHighestPrice = (object) => {
    let arrayPrices = [];
    // console.log(arrayPrices)
    object.map((item, i) => {
        arrayPrices.push(item.price)
    })
    // console.log(arrayPrices)
    const maxPrice = Math.max()
}

findHighestPrice(myArray)

// console.log(directFindingMaxPrice(myArray));


const myObject = {
    0: { name: 'Percussion instruments', price: 25 },
    1: { name: 'Wind instruments', price: 100 },
    2: { name: 'Stringed instruments', text: "blabla", price: 45 },
    3: { name: 'Electronic instruments', price: 67 },
    4: { name: 'Accessories', price: 98 },
    5: { name: 'Electronics', price: -25 },
    6: { name: 'Headphones', price: 75 },
    7: { name: 'Cameras' },
    8: { name: 'Laptops' },
    9: { name: 'Food', price: 100 }
};
console.log('typeof myObject', typeof myObject);

const myObjectToArray = Array.from(Object.values(myObject), item => item.price)
console.log('myObjectToArray', myObjectToArray);
console.log('typeof myObjectToArray', typeof myObjectToArray);


const myObjectReallyToArray = Object.keys(myObject).map((key) => [key, myObject[key]]);
console.log('myObjectReallyToArray', myObjectReallyToArray);
console.log('typeof myObjectReallyToArray', typeof myObjectReallyToArray);
