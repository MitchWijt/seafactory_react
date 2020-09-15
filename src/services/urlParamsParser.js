const qs = require('qs');

const urlParamsParser = (paramsString) => {
    let string = paramsString.replace('?', '');
    return qs.parse(string);
}

export default urlParamsParser;