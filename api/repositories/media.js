const MediaModel = require("../models/media");
const fs = require("fs");

class MediaRepository {
  async index(data = {}) {
    return new Promise((resolve, reject) => {
      fs.readFile("database/media.json", "utf8", async (err, res) => {
        if (err) {
          fs.writeFile("database/media.json", "[]", (err, res) => res);
        }
        let media = JSON.parse(res);
        if (data.course_id) {
          let found_media = [];
          media.map((v) =>
            v.course_id == data.course_id ? found_media.push(v) : null
          );
          resolve(found_media);
          return;
        }
        resolve(media);
      });
    });
  }
  async create(media_data = {}) {
    let media = await this.index();
    media.push(MediaModel.set(media_data));
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile("database/media.json", JSON.stringify(media), () => {
          resolve(media_data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async delete(media_id) {
    let media = await this.index();
    media.map((v) => {
      if (v.id == media_id) {
        media.splice(media.indexOf(v), 1);
      }
    });
    return new Promise((resolve, reject) => {
      fs.writeFile("database/media.json", JSON.stringify(media), (err, res) => {
        if (err) reject(err);
        resolve(`deleted course by id ${media_id}`);
      });
    });
  }
}

module.exports = MediaRepository;