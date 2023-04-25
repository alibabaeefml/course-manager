const MediaModel = require("../models/media");
const fs = require("fs");
const media_path = "api/database/media.json";
class MediaRepository {
  async index(course_id = null) {
    return new Promise((resolve, reject) => {
      fs.readFile(media_path, "utf8", async (err, res) => {
        if (err) {
          fs.writeFile(media_path, "[]", (err, res) => res);
        }
        let media = JSON.parse(res);
        if (course_id) {
          let found_media = [];
          media.map((v) =>
            v.course_id == course_id ? found_media.push(v) : null
          );
          if (found_media.length) {
            resolve(found_media);
          } else {
            resolve(media);
          }
        }
      });
    });
  }
  async create(media_data = {}) {
    let media = await this.index();
    media.push(MediaModel.set(media_data));
    return new Promise((resolve, reject) => {
      fs.writeFile(media_path, JSON.stringify(media), (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
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
      fs.writeFile(media_path, JSON.stringify(media), (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

module.exports = MediaRepository;
