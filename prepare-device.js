console.info('prepare-device started');

const fs = require('fs');
const moment = require('moment');

const rawFile = fs.readFileSync('../safepass-reference-scripts/response_API#4_Badge_GetDeviceLocations.json');
const rawData = JSON.parse(rawFile);
let prepared = [];

rawData.forEach((deviceData) => {
    const entries = deviceData.datas;
    entries.map((record) => {
        const mapped = record;
        mapped.deviceId = deviceData.deviceId;

        const lngLat = record.loc.split('&');
        mapped.geoLoc = `POINT (${lngLat[0]} ${lngLat[1]})`;

        const seenTs = moment(record.seen).format('YYYY-MM-DD HH:mm:ss');
        mapped.seenTs = seenTs.toString();
        return mapped;
    });
    prepared = prepared.concat(entries);
});

const outputFile = 'prepared-device.json';

console.info(`Writing ${prepared.length} records to ${outputFile}`);
fs.writeFileSync(outputFile, JSON.stringify(prepared));
console.info('File writing complete');
