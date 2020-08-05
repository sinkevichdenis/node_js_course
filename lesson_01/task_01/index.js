/*
ES-5 version

function reverseString (string) {
    return string.split('').reverse().join('');
}

process.stdin.on('data', function (data) {
    process.stdout.write(reverseString (data.toString()));
});*/

const reverseString = string => string.split('').reverse().join('');

process.stdin.on('data', data => {
    console.log(reverseString (data.toString()));
});
