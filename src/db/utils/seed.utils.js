exports.randomString = (length) => Math.random().toString(36).substring(2, length)  

exports.randomInt = (min, max) => Math.random() * (max - min) + min

exports.generateObjects = (count, generatePattern) => {
  const objArray = new Array()
  for (let i = 0; i < count; i++) {
    objArray.push(generatePattern())
  }
  return objArray
}