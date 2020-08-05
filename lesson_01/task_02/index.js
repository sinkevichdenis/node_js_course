import fs from 'fs';
import csv from 'csvtojson';

const onError = err => {
    console.log(err.message)
};
const onComplete = () => {
    console.log('Task completed');
};
const onNext = json => {
    console.log(json)
};

const rStream = fs.createReadStream('./assets/csv/nodejs-hw1-ex1.csv');
const wStream = fs
    .createWriteStream('./assets/fromCSV.txt')
    .on('error', onError)
    .on('finish', onComplete);

csv()
    .fromStream(rStream)
    .subscribe(onNext, onError)
    .pipe(wStream);
