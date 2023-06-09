import { rimraf } from "rimraf";
import CourseModel from "../models/course";
import fs from "fs";
import AttendantRepository from "./attendant";
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
          let rel_atts = attendants.filter((a) => a.course_id == v.id);

          v.members_quantity = rel_atts.length;

          try {
            if (rel_atts.length) {
              let att_times = rel_atts.map((a) =>
                a.attendance_time ? Number(a.attendance_time) : 0
              );

              let relative_times = [];
              rel_atts.map((a) => {
                if (a.relatives.length) {
                  a.relatives.map((r) =>
                    relative_times.push(
                      r.attendance_time ? Number(r.attendance_time) : 0
                    )
                  );
                }
              });

              v.total_hours_attended = att_times
                .concat(relative_times)
                .reduce((a, b) => a + b);
            }
          } catch (e) {
            console.log(e);
          }
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
    let attendant_repo = new AttendantRepository();
    let attendants = (await attendant_repo.index()).filter(
      (v) => v.course_id != course_id
    );
    fs.writeFileSync(
      "api/database/attendants.json",
      JSON.stringify(attendants)
    );
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
