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
    courses.push(CourseModel.set(course_data));
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
            ? resolve(CourseModel.get(v))
            : resolve(`no course found by id ${course_id}!`)
        );
      });
    });
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
      fs.writeFile(
        "database/courses.json",
        JSON.stringify(courses),
        (err, res) => {
          if (err) reject(err);
          resolve(found);
        }
      );
    });
  }
  async delete(course_id) {
    let courses = await this.index();
    courses.map((v) => {
      if(v.id == course_id){
        courses.splice(courses.indexOf(v),1);
      }
    });
    return new Promise((resolve, reject) => {
      fs.writeFile(
        "database/courses.json",
        JSON.stringify(courses),
        (err, res) => {
          if (err) reject(err);
          resolve(`deleted course by id ${course_id}`);
        }
      );
    });
  }
}

module.exports = CourseRepository;
