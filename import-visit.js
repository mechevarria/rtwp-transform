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
    const statement = client.prepare(
        `INSERT INTO VISIT(
            VISITOR_NAME,
            VISIT_ID,
            EMAIL,
            MOBILE,
            MOBILE_COUNTRY,
            FIRST_NAME,
            LAST_NAME,
            VISITOR_TYPE,
            IMAGE_URL,
            COMPANY_NAME,
            ADDRESS,
            STATUS,
            DEVICE_ID,
            READABLE_DEVICE_ID,
            UUID,
            START_TS,
            LAST_TS,
            LAST_MODIFICATION_TS) 
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    );

    let count = 0;

    data.forEach((record) => {
        const bindParams = [
            record.visitorName,
            record.visitId,
            record.email,
            record.mobile,
            record.mobileCountry,
            record.firstName,
            record.lastName,
            record.visitorType,
            record.imageUrl,
            record.companyName,
            record.address,
            record.status,
            record.deviceId,
            record.readableDeviceId,
            record.id,
            record.startTimestamp,
            record.lastTimestamp,
            record.lastModificationTimestamp
        ];
        const result = statement.exec(bindParams);
        count += result;
    });

    console.info(`Inserted ${count} records`);
});
