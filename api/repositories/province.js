const fs = require("fs");

class ProvinceRepository {
  async index() {
    return new Promise((resolve, reject) => {
      fs.readFile("database/provinces.json", "utf8", async (err, res) => {
        if (err) {
          reject("missing provinces.json!!")
        }
        resolve(res);
      });
    });
  }
}

module.exports = ProvinceRepository;
