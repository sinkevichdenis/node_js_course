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

const PATH_WRITTEN_BY_LINE = './assets/fromCsvByLine.txt';
const PATH_WRITTEN_WHOLE = './assets/fromCsvWhole.txt';

const rStream = fs.createReadStream('./assets/csv/nodejs-hw1-ex1.csv');
const createWStream = path => fs
    .createWriteStream(path)
    .on('error', onError)
    .on('finish', onComplete);

// written line by line
csv()
    .fromStream(rStream)
    .subscribe(onNext, onError)
    .pipe(createWStream(PATH_WRITTEN_BY_LINE));

// written whole
rStream.pipe(csv()).pipe(createWStream(PATH_WRITTEN_WHOLE));
