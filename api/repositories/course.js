const CourseModel = require("../models/course");
const fs = require("fs");

class CourseRepository {
  async index(data = {}) {
    return new Promise((resolve, reject) => {
      fs.readFile("database/courses.json", "utf8", async (err, res) => {
        if (err) {
          fs.writeFile("database/courses.json", "[]", (err, res) => res);
        }
        let courses = JSON.parse(res);
        if (data.province_id) {
          let found_courses = [];
          courses.map((v) =>
            v.province_id == data.province_id ? found_courses.push(v) : null
          );
          resolve(found_courses);
          return;
        }
        resolve(courses);
      });
    });
  }
  async create(course_data = {}) {
    let courses = await this.index();
    courses.push(CourseModel(course_data));
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile("database/courses.json", JSON.stringify(courses), () => {
          resolve(course_data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(course_id) {
    let courses = await this.index();
    return new Promise((resolve, reject) => {
      fs.readFile("database/courses.json", "utf8", async (err, res) => {
        courses.map((v) =>
          v.id == course_id
            ? resolve(v)
            : resolve(`no course found by id ${course_id}`)
        );
      });
    });
  }
}

module.exports = CourseRepository;
