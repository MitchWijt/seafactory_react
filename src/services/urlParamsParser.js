const qs = require('qs')

const urlParamsParser = (paramsString) => {
  const string = paramsString.replace('?', '')
  return qs.parse(string)
}

export default urlParamsParser
