let config = {}
switch (process.env.NODE_ENV) {
    case 'development' :
        config.apiUrl = 'http://localhost:5000/api/v1';
        break;
    case 'production' :
        config.apiUrl = 'https://safe-citadel-31187.herokuapp.com/api/v1';
        break;
}


export default config;