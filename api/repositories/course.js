const CourseModel = require("../models/course");
const fs = require("fs");
const courses_path = "api/database/courses.json";
class CourseRepository {
  async index(province_id = null) {
    return new Promise((resolve, reject) => {
      fs.readFile(courses_path, "utf8", async (err, res) => {
        if (err) {
          fs.writeFile(courses_path, "[]", (err, res) => res);
        }
        let courses = JSON.parse(res);
        if (province_id) {
          let found_courses = [];
          courses.map((v) =>
            v.province_id == province_id ? found_courses.push(v) : null
          );
          if (found_courses.length) {
            resolve(found_courses);
          } else {
            resolve(null);
          }
        }
        resolve(courses);
      });
    });
  }
  async create(course_data = {}) {
    let courses = await this.index();
    courses.push(CourseModel.set(course_data));
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile(courses_path, JSON.stringify(courses), () => {
          resolve(course_data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(course_id) {
    let courses = await this.index();
    return courses.map((v) =>
      v.id == course_id ? CourseModel.get(v) : null
    )[0];
  }
  async update(course_id, course_data) {
    let courses = await this.index();
    let found = false;
    courses.map((v) => {
      if (v.id == course_id) {
        for (let item in course_data) {
          v[item] = course_data[item];
        }
        found = v;
      }
    });
    if (!found) {
      return `no course found by id ${course_id} to update!`;
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(courses_path, JSON.stringify(courses), (err, res) => {
        if (err) reject(err);
        resolve(courses);
      });
    });
  }
  async delete(course_id) {
    let courses = await this.index();
    courses.map((v) => {
      if (v.id == course_id) {
        courses.splice(courses.indexOf(v), 1);
      }
    });
    return new Promise((resolve, reject) => {
      fs.writeFile(courses_path, JSON.stringify(courses), (err, res) => {
        if (err) reject(err);
        resolve(courses);
      });
    });
  }
}

module.exports = CourseRepository;
