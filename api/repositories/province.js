import fs from "fs";

class ProvinceRepository {
  async index() {
    return new Promise((resolve, reject) => {
      fs.readFile("api/database/provinces.json", "utf8", async (err, res) => {
        if (err) {
          reject("missing provinces.json!!");
        }
        resolve(res);
      });
    });
  }
}


export default ProvinceRepository;