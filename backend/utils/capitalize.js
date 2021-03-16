exports.capitalize = (name) => {
    let textArray = name.trim().split(' ');
    let firstWord = textArray[0];
    let firstWordWithoutFirstLetter = textArray[0].slice(1);
    let arrayFirstWordWithoutFirstLetter = firstWordWithoutFirstLetter.split('');
    let isArrayLengthLargerThanTen = arrayFirstWordWithoutFirstLetter.length > 11 ? true : false;
    let cropedArrayFirstWord = arrayFirstWordWithoutFirstLetter.slice(0, 10)
    let TenthFirstLetters = '';
    for (let i = 0; i < cropedArrayFirstWord.length; i++) {
        TenthFirstLetters += cropedArrayFirstWord[i]
    }
    let points = ''
    isArrayLengthLargerThanTen ? points = '...' : null
    let capitalizedFirstName = '';
    capitalizedFirstName += textArray[0].charAt(0).toUpperCase() + TenthFirstLetters + points;
    return capitalizedFirstName
}