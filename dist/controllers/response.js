const uuid4 = require('uuid/v4');

module.exports = {
  response: (res, status, error, message, pageDetail, sourceData, data) => {
    let resultPrint = {};

    resultPrint = uuid4();
    resultPrint.status = status || 200;
    resultPrint.error = error || false;
    resultPrint.message = message || {};
    resultPrint.data = data || {};
    resultPrint.sourceData = sourceData || {};
    resultPrint.pageDetail = pageDetail || {};

    res.status(resultPrint.status).json(resultPrint);
  }
};