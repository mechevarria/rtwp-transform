console.info('Import visit started');

const fs = require('fs');
const hdbext = require('@sap/hdbext');

const rawFile = fs.readFileSync('default-services.json');
const hanaConfig = JSON.parse(rawFile).hana;

const rawData = fs.readFileSync('prepared-visit.json');
const data = JSON.parse(rawData);

hdbext.createConnection(hanaConfig, (error, client) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    // TODO
    const statement = client.prepare(
        `INSERT INTO VISIT(LOC, PROB, SEEN, FLOOR, DEVICE_ID, GEO_LOC, SEEN_TS) 
         VALUES (?,?,?,?,?, new ST_POINT(?),?)`
    );

    let count = 0;

    data.forEach((record) => {
        const bindParams = [record.loc, record.prob, record.seen, record.floor, record.deviceId, record.geoLoc, record.seenTs];
        const result = statement.exec(bindParams);
        count += result;
    });

    console.info(`Inserted ${count} records`);
});
