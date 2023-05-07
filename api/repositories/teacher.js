import TeacherModel from "../models/teacher";
import fs from "fs";
const teachers_path = "api/database/teachers.json";
class TeacherRepository {
  async index() {
    return new Promise((resolve, reject) => {
      fs.readFile(teachers_path, "utf8", async (err, res) => {
        if (err) {
          fs.writeFile(teachers_path, "[]", (err, res) => res);
        }
        console.log(res)
        let teachers = JSON.parse(res);
        resolve(teachers.map((v) => TeacherModel.get(v)));
      });
    });
  }
  async create(teacher_data) {
    let teachers = await this.index();
    const new_teacher = TeacherModel.set(teacher_data);
    if (Object.values(new_teacher).find((v) => !v) !== undefined) {
      teachers.push(new_teacher);
    }
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile(teachers_path, JSON.stringify(teachers), () => {
          resolve(new_teacher);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(teacher_id) {
    let teachers = await this.index();
    return teachers.find((v) =>
      v.id == teacher_id ? TeacherModel.get(v) : null
    );
  }
  async update(teacher_id, teacher_data) {
    let teachers = await this.index();
    teacher_data = TeacherModel.set(teacher_data);
    let found = teachers.find((v) => v.id == teacher_id);
    if (!found) {
      return `no teacher found by id ${teacher_id} to update!`;
    }
    for (let item in teacher_data) {
      if (found[item]) {
        found[item] = teacher_data[item];
      } else {
        return;
      }
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(teachers_path, JSON.stringify(teachers), (err, res) => {
        if (err) reject(err);
        resolve(teachers);
      });
    });
  }
  async delete(teacher_id) {
    let teachers = await this.index();
    let found = teachers.find((v) => v.id == teacher_id);
    teachers.splice(teachers.indexOf(found), 1);
    return new Promise((resolve, reject) => {
      fs.writeFile(teachers_path, JSON.stringify(teachers), (err, res) => {
        if (err) reject(err);
        resolve(teachers.map((v) => TeacherModel.get(v)));
      });
    });
  }
}

export default TeacherRepository;
