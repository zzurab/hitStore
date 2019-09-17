
const BASE_URL = 'http://localhost:5000/hitnews-52304/us-central1/';
import URL from 'url';

module.exports = {
    api: {
        getApiUrl: url => BASE_URL + 'api/' + url,
        languageKeys: 'languages/keys',
        languageKeywords: 'languages'
    }
}