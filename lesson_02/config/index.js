import nconf from 'nconf';
import path from 'path';

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'default.json') });

export default nconf;
