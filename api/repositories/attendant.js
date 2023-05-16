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
            attendants.filter(
              (v) => AttendantModel.get(v).course_id == course_id
            )
          );
        } else {
          resolve(attendants.map((v) => AttendantModel.get(v)));
        }
      });
    });
  }
  async create(attendant_data) {
    let attendants = await this.index();
    const new_attendant = AttendantModel.set(attendant_data);
    
    if (Object.values(new_attendant).includes(undefined)) {
      console.log('problem')
      return;
    }

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
  async show_by_NC(NC) {
    let attendants = await this.index();
    return attendants.find((v) => v.national_code == NC);
  }
  async update(attendant_id, attendant_data) {
    let attendants = await this.index();
    attendant_data = AttendantModel.set(attendant_data);
    let found = attendants.find((v) => v.id == attendant_id);

    if (!found) {
      return `no attendant found by id ${attendant_id} to update!`;
    }

    for (let item in attendant_data) {
      if (attendant_data[item] != undefined) {
        found[item] = attendant_data[item];
      } else {
        return "error";
      }
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
    let found = attendants.find((v) => v.id == attendant_id);
    attendants.splice(attendants.indexOf(found), 1);
    return new Promise((resolve, reject) => {
      fs.writeFile(attendants_path, JSON.stringify(attendants), (err, res) => {
        if (err) reject(err);
        resolve(attendants.map((v) => AttendantModel.get(v)));
      });
    });
  }
}

export default AttendantRepository;
