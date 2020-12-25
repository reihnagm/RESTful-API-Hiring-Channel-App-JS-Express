

module.exports = {
 
 slug: (val, isUnique, uniqueId) => {
  return isUnique ? `${val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}-${uniqueId}`
 	: `${val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}`
 }

}