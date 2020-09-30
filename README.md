# Return to Work Package Data Transformation

* Transforms data provided by [SafePassGlobal](https://safepassglobal.com/) REST api

* [SAP HANA](https://www.sap.com/products/hana.html) Database for source is located in the db module of [cp-rtwp](https://github.com/openNS2/cp-rtwp)

## Data Transformation

* To prepare the safepass api data for import, run this transform process
```bash
npm install
npm run prepare
```

* To load the prepared data in hana, make sure you are logged in to cloud platform. Change the environment variables with your values or set permanently in `~/.profile` or `~/.bashrc`
```bash
export CP_USER=i123456
export CP_PASSWORD=SapCloudPlatformPass

./cf-login.sh
```

* Then run the import which will clean existing data before

```bash
./hana-import.sh
```