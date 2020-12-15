console.info('Prepare Visit Started');

const fs = require('fs');
const moment = require('moment');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const inputFile = '../safepass-reference-scripts/response_API#3_Visit_GetListUniqueLocations.json';
const outputFile = 'prepared-visit.json';
const idsFile = 'device-ids.json';

function getTs(time) {
    let timeStamp = null;
    if (time !== null) {
        timeStamp = moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
    }
    return timeStamp;
}
const prepared = [];
const deviceIds = [];

fs.createReadStream(inputFile)
    .pipe(JSONStream.parse('result.items.*'))
    .pipe(es.mapSync((item) => {
        const mapped = item;
        delete mapped.floorMaps;
        deviceIds.push(mapped.deviceId);
        mapped.startTimestamp = getTs(mapped.startTime);
        mapped.lastTimestamp = getTs(mapped.lastTime);
        mapped.lastModificationTimestamp = getTs(mapped.lastModificationTime);
        prepared.push(mapped);
        console.info(`prepared.length=${prepared.length}`);
    }).on('end', () => {
        console.info(`Writing ${prepared.length} records to ${outputFile}`);
        fs.writeFileSync(outputFile, JSON.stringify(prepared));
        fs.writeFileSync(idsFile, JSON.stringify(deviceIds));
        console.info('File writing complete');
    }));
