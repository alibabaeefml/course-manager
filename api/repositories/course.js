import { rimraf } from "rimraf";
import CourseModel from "../models/course";
import fs from "fs";
const courses_path = "api/database/courses.json";
class CourseRepository {
  async index(province_id = null) {
    return new Promise((resolve, reject) => {
      fs.readFile(courses_path, "utf8", async (err, res) => {
        if (err) {
          fs.writeFile(courses_path, "[]", (err, res) => res);
        }
        let courses = JSON.parse(res);
        courses.map((v) => {
          let attendants = JSON.parse(
            fs.readFileSync("api/database/attendants.json")
          );
          v.members_quantity = attendants.filter(
            (a) => a.course_id == v.id
          ).length;
        });
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
    const new_course = CourseModel.set(course_data);
    courses.push(new_course);
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile(courses_path, JSON.stringify(courses), () => {
          resolve(new_course);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(course_id) {
    let courses = await this.index();
    return courses.find((v) => (v.id == course_id ? CourseModel.get(v) : null));
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
    if (!found.name) {
      return `field name is necessary`;
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
    let deleted;
    courses.map((v) => {
      if (v.id == course_id) {
        courses.splice(courses.indexOf(v), 1);
        deleted = v;
      }
    });

    return new Promise((resolve, reject) => {
      rimraf.sync(`api/storage/media/course_${course_id}`);

      fs.writeFile(courses_path, JSON.stringify(courses), (err, res) => {
        if (err) reject(err);
        resolve(deleted);
      });
    });
  }
}

export default CourseRepository;
