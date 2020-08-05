import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';

const onError = err => {
    console.log(err.message)
};
const onComplete = () => {
    console.log('Task completed');
};
const onNext = json => {
    console.log(json)
};

const getPath = route => path.normalize(route);

const PATH_WRITTEN_BY_LINE = getPath('./assets/fromCsvByLine.txt');
const PATH_WRITTEN_WHOLE = getPath('./assets/fromCsvWhole.txt');
const TEMPLATE_PATH = getPath('./assets/csv/nodejs-hw1-ex1.csv');

const rStream = fs.createReadStream(TEMPLATE_PATH);
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
