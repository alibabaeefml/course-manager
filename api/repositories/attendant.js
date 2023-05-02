import AttendantModel from "../models/attendant";
import fs from "fs";
const attendants_path = "api/database/attendants.json";
class AttendantRepository {
  async index(course_id = null) {
    return new Promise((resolve, reject) => {
      fs.readFile(attendants_path, "utf8", async (err, res) => {
        if (err) {
          fs.writeFile(attendants_path, "[]", (err, res) => res);
        }
        let attendants = JSON.parse(res);
        if (course_id) {
          resolve(
            attendants.filter((v) => AttendantModel.get(v).id == course_id)
          );
        }
        resolve(attendants.map((v) => AttendantModel.get(v)));
      });
    });
  }
  async create(attendant_data) {
    let attendants = await this.index();
    const new_attendant = AttendantModel.set(attendant_data);
    attendants.push(new_attendant);
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile(attendants_path, JSON.stringify(attendants), () => {
          resolve(new_attendant);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(attendant_id) {
    let attendants = await this.index();
    return attendants.find((v) =>
      v.id == attendant_id ? AttendantModel.get(v) : null
    );
  }
  async update(attendant_id, attendant_data) {
    let attendants = await this.index();
    let found = false;
    attendants.map((v) => {
      if (v.id == attendant_id) {
        for (let item in attendant_data) {
          v[item] = attendant_data[item];
        }
        found = v;
      }
    });
    if (!found) {
      return `no course found by id ${attendant_id} to update!`;
    }
    if (!found.name) {
      return `field name is necessary`;
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(attendants_path, JSON.stringify(attendants), (err, res) => {
        if (err) reject(err);
        resolve(attendants);
      });
    });
  }
  async delete(attendant_id) {
    let attendants = await this.index();
    attendants.map((v) => {
      if (v.id == attendant_id) {
        attendants.splice(attendants.indexOf(v), 1);
      }
    });

    return new Promise((resolve, reject) => {

      fs.writeFile(attendants_path, JSON.stringify(attendants), (err, res) => {
        if (err) reject(err);
        resolve(attendants);
      });
    });
  }
}

export default AttendantRepository;
