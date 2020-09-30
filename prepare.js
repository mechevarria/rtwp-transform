console.info('prepare started');

const fs = require('fs');
const moment = require('moment');

const rawFile = fs.readFileSync('../safepass-reference-scripts/response_API#4_Badge_GetDeviceLocations.json');
const rawData = JSON.parse(rawFile);

const prepared = rawData[0].datas;

prepared.map((record) => {
    const mapped = record;
    mapped.deviceId = rawData[0].deviceId;

    const lngLat = record.loc.split('&');
    mapped.geoLoc = `POINT (${lngLat[0]} ${lngLat[1]})`;

    const seenTs = moment(record.seen).format('YYYY-MM-DD HH:mm:ss');
    mapped.seenTs = seenTs.toString();
    return mapped;
});

const outputFile = 'prepared.json';

console.info(`Writing ${prepared.length} records to ${outputFile}`);
fs.writeFileSync(outputFile, JSON.stringify(prepared));
console.info('File writing complete');
