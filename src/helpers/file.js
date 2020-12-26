module.exports = {
  
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
  }

}
