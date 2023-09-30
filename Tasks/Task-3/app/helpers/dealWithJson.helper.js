const fs = require('fs')
const fileName = 'models/user.json'

class DealWithJSON {

  static readFromJSON (){
    let result
    try {
      result = JSON.parse(fs.readFileSync(fileName))
      if(!Array.isArray(result))  result = []
    } catch (e) {
      result = []
    }
    return result
  }

  static writeToJSON(data){
    fs.writeFileSync(fileName, JSON.stringify(data))
  }
}

module.exports = DealWithJSON