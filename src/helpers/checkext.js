module.exports = {
  
  checkFileImg: (extFile) => {
    switch (extFile) {
      case 'image/jpeg':
        return true
      case 'image/jpg':
        return true
      case 'image/gif':
        return true
      case 'image/png':
        return true
      case 'image/svg+xml':
        return true
      case 'image/bmp':
        return true
      default:
        break;
    }
  }

}
