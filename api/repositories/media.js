const fs = require("fs");
const formidable = require("formidable");
const random_id = () => Math.floor(Math.random() * 615131613);

const media_db = "api/database/media.json";
class MediaRepository {
  async index(course_id = null) {
    return new Promise((resolve, reject) => {
      fs.readFile(media_db, "utf8", async (err, res) => {
        if (err) {
          fs.writeFile(media_db, "[]", (err, res) => res);
        }
        let media = JSON.parse(res);
        if (course_id) {
          let found_media = [];
          media.map((v) =>
            v.course_id == course_id ? found_media.push(v) : null
          );
          if (found_media.length) {
            resolve(found_media);
          }
        }
        resolve(media);
      });
    });
  }
  async create(req = {}) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, async function (err, fields, files) {
        if (err) console.error(err);

        const userPath = files["file"].filepath;
        const course_id = fields.course_id;
        const media_id = random_id();
        let media = await new MediaRepository().index(course_id);
        const media_path = `api/storage/media/course_${course_id}/media_${media_id}.jpg`;

        try {
          fs.mkdir(`api/storage/media/course_${course_id}`, (err, res) => null);
        } catch (err) {}
        // save a copy of user's file
        fs.copyFile(userPath, media_path, function (err) {
          if (err) {
            reject(err);
            return;
          }
          media.push({
            id: media_id,
            course_id: course_id,
            src: "/" + media_path,
          });
          fs.writeFile(media_db, JSON.stringify(media), async (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(media);
          });
        });
      });
    });
  }
  async delete(media_id) {
    var path = require("path"),
      fs = require("fs");

    async function fromDir(startPath, filter) {
      //console.log('Starting from dir '+startPath+'/');

      if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
      }

      var files = fs.readdirSync(startPath);
      for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
          fromDir(filename, filter); //recurse
        } else if (filename.includes(filter)) {
          fs.unlinkSync(filename);
        }
      }
    }

    await fromDir("api/storage", `media_${media_id}.jpg`);

    let media = await this.index();
    media.map((v) => {
      if (v.id == media_id) {
        media.splice(media.indexOf(v), 1);
      }
    });

    return new Promise((resolve, reject) => {
      fs.writeFile(media_db, JSON.stringify(media), (err, res) => {
        if (err) reject(err);
        resolve(media);
      });
    });
  }
}

module.exports = MediaRepository;
