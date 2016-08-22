let config = {
    listRecordsLimit: 2
}
switch (process.env.NODE_ENV) {
    case 'development' :
        config.apiUrl = document.location.protocol+'//localhost:5000/api/v1';
        break;
    case 'production' :
        config.apiUrl = document.location.protocol+'//radekcrm.herokuapp.com/api/v1';
        break;
}


export default config;