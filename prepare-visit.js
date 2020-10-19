console.info('Prepare Visit Started');

const fs = require('fs');
const moment = require('moment');

const rawFile = fs.readFileSync('../safepass-reference-scripts/response_API#3_Visit_GetListUniqueLocations.json');
const rawData = JSON.parse(rawFile);
const prepared = [];

function getTs(time) {
    let timeStamp = null;
    if (time !== null) {
        timeStamp = moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
    }
    return timeStamp;
}

rawData.result.items.forEach((item) => {
    const mapped = item;
    delete mapped.floorMaps;
    mapped.startTimestamp = getTs(mapped.startTime);
    mapped.lastTimestamp = getTs(mapped.lastTime);
    mapped.lastModificationTimestamp = getTs(mapped.lastModificationTime);

    prepared.push(mapped);
});

const outputFile = 'prepared-visit.json';

console.info(`Writing ${prepared.length} records to ${outputFile}`);
fs.writeFileSync(outputFile, JSON.stringify(prepared));
console.info('File writing complete');
