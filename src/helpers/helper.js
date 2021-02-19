

module.exports = {

	response: (res, status, error, message, data) => {
    let resultPrint = {}
    resultPrint.status = status || 200
    resultPrint.error = error || false
    resultPrint.message = message || 'Ok.'
    if (data) {
      resultPrint.data = data
    }
    return res.status(resultPrint.status).json(resultPrint)
  },

  responsePagination: (res, status, error, message, pageDetail, data) => {
    let resultPrint = {}
    resultPrint.status = status || 200
    resultPrint.error = error || false
    resultPrint.message = message || 'Ok.'
    resultPrint.pageDetail = pageDetail || {}
    resultPrint.data = data || {}
    return res.status(resultPrint.status).json(resultPrint)
  },

	isImage: (ext) => {
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      return true
    }
    return false
  },

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
 
 	slug: (val, isUnique, markUnique) => {
  	return isUnique ? `${val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}-${markUnique}`
 		: `${val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}`
 	}

}