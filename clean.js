console.info('clean started');

const fs = require('fs');
const hdbext = require('@sap/hdbext');

const rawFile = fs.readFileSync('default-services.json');
const hanaConfig = JSON.parse(rawFile).hana;

hdbext.createConnection(hanaConfig, (error, client) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    const data = client.exec('delete from BADGE_LOCATION');
    console.info(data);
});
