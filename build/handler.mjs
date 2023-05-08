import express from "express";
import body_parser from "body-parser";
import { rimraf } from "rimraf";
import fs__default from "fs";
import formidable from "formidable";
import path from "path";
const random_id$3 = () => Math.floor(Math.random() * 615131613);
const CourseModel = {
  get(data) {
    return {
      id: data.id,
      province_id: data.province_id,
      name: data.name,
      number: data.number,
      members_quantity: data.members_quantity,
      start_date: data.start_date,
      finish_date: data.finish_date,
      total_hours_attended: data.total_hours_attended
    };
  },
  set(data) {
    return {
      id: data.id || random_id$3(),
      province_id: data.province_id,
      name: data.name,
      number: data.number || null,
      members_quantity: data.members_quantity || null,
      start_date: data.start_date || null,
      finish_date: data.finish_date || null,
      total_hours_attended: data.total_hours_attended || null
    };
  }
};
const RelativeModel = {
  get(data) {
    return {
      name: data.name,
      relation: data.relation,
      attendance_time: data.attendance_time
    };
  },
  set(data) {
    return {
      name: data.name,
      relation: data.relation,
      attendance_time: data.attendance_time
    };
  }
};
const random_id$2 = () => Math.floor(Math.random() * 615131613);
const AttendantModel = {
  get(data) {
    return {
      id: data.id,
      course_id: data.course_id,
      province_id: data.province_id,
      city: data.city,
      police_rank: data.police_rank,
      first_name: data.first_name,
      last_name: data.last_name,
      personal_number: data.personal_number,
      national_code: data.national_code,
      department: data.department,
      is_primary: data.is_primary ? true : false,
      family_members: data.family_members,
      under_two_year_old_children_quantity: data.under_two_year_old_children_quantity,
      over_two_year_old_children_quantity: data.over_two_year_old_children_quantity,
      phone_number: data.phone_number,
      attendance_time: data.attendance_time,
      relatives: data.relatives.length ? data.relatives.map((r) => RelativeModel.get(r)) : []
    };
  },
  set(data) {
    return {
      id: data.id || random_id$2(),
      course_id: data.course_id,
      province_id: data.province_id,
      city: data.city,
      police_rank: data.police_rank,
      first_name: data.first_name,
      last_name: data.last_name,
      personal_number: data.personal_number,
      national_code: data.national_code,
      department: data.department,
      is_primary: data.is_primary ? 1 : 0,
      family_members: data.family_members,
      under_two_year_old_children_quantity: data.under_two_year_old_children_quantity,
      over_two_year_old_children_quantity: data.over_two_year_old_children_quantity,
      phone_number: data.phone_number,
      attendance_time: data.attendance_time,
      relatives: data.relatives.length ? data.relatives.map((r) => RelativeModel.set(r)) : []
    };
  }
};
const attendants_path = "api/database/attendants.json";
class AttendantRepository {
  async index(course_id = null) {
    return new Promise((resolve, reject) => {
      fs__default.readFile(attendants_path, "utf8", async (err, res) => {
        if (err) {
          fs__default.writeFile(attendants_path, "[]", (err2, res2) => res2);
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
    if (Object.values(new_attendant).includes(void 0)) {
      return;
    }
    let same_found = attendants.find(
      (v) => v.national_code == attendant_data.national_code
    );
    attendants.push(new_attendant);
    new_attendant.repetitive = same_found;
    return new Promise((resolve, reject) => {
      try {
        fs__default.writeFile(attendants_path, JSON.stringify(attendants), () => {
          resolve(new_attendant);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(attendant_id) {
    let attendants = await this.index();
    return attendants.find(
      (v) => v.id == attendant_id ? AttendantModel.get(v) : null
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
      if (attendant_data[item] != void 0) {
        found[item] = attendant_data[item];
      } else {
        return "error";
      }
    }
    return new Promise((resolve, reject) => {
      fs__default.writeFile(attendants_path, JSON.stringify(attendants), (err, res) => {
        if (err)
          reject(err);
        resolve(attendants);
      });
    });
  }
  async delete(attendant_id) {
    let attendants = await this.index();
    let found = attendants.find((v) => v.id == attendant_id);
    attendants.splice(attendants.indexOf(found), 1);
    return new Promise((resolve, reject) => {
      fs__default.writeFile(attendants_path, JSON.stringify(attendants), (err, res) => {
        if (err)
          reject(err);
        resolve(attendants.map((v) => AttendantModel.get(v)));
      });
    });
  }
}
const courses_path = "api/database/courses.json";
class CourseRepository {
  async index(province_id = null) {
    return new Promise((resolve, reject) => {
      fs__default.readFile(courses_path, "utf8", async (err, res) => {
        if (err) {
          fs__default.writeFile(courses_path, "[]", (err2, res2) => res2);
        }
        let courses = JSON.parse(res);
        courses.map((v) => {
          let attendants = JSON.parse(
            fs__default.readFileSync("api/database/attendants.json")
          );
          v.members_quantity = attendants.filter(
            (a) => a.course_id == v.id
          ).length;
        });
        if (province_id) {
          let found_courses = [];
          courses.map(
            (v) => v.province_id == province_id ? found_courses.push(v) : null
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
        fs__default.writeFile(courses_path, JSON.stringify(courses), () => {
          resolve(new_course);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(course_id) {
    let courses = await this.index();
    return courses.find((v) => v.id == course_id ? CourseModel.get(v) : null);
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
      fs__default.writeFile(courses_path, JSON.stringify(courses), (err, res) => {
        if (err)
          reject(err);
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
    let attendants = await attendant_repo.index().filter((v) => v.course_id != course_id);
    fs__default.writeFileSync(
      "api/database/attendants.json",
      JSON.stringify(attendants)
    );
    return new Promise((resolve, reject) => {
      rimraf.sync(`api/storage/media/course_${course_id}`);
      fs__default.writeFile(courses_path, JSON.stringify(courses), (err, res) => {
        if (err)
          reject(err);
        resolve(deleted);
      });
    });
  }
}
const router$4 = express.Router();
router$4.get("/index-course/:province_id?", async (req, res) => {
  res.send(await new CourseRepository().index(req.params["province_id"]));
});
router$4.post("/create-course", async (req, res) => {
  res.send(await new CourseRepository().create(req.body));
});
router$4.get(`/show-course/:id`, async (req, res) => {
  res.send(await new CourseRepository().show(req.params["id"]));
});
router$4.put("/update-course/:id", async (req, res) => {
  res.send(await new CourseRepository().update(req.params["id"], req.body));
});
router$4.delete("/delete-course/:id", async (req, res) => {
  res.send(await new CourseRepository().delete(req.params["id"]));
});
class ProvinceRepository {
  async index() {
    return new Promise((resolve, reject) => {
      fs__default.readFile("api/database/provinces.json", "utf8", async (err, res) => {
        if (err) {
          reject("missing provinces.json!!");
        }
        resolve(res);
      });
    });
  }
}
const router$3 = express.Router();
router$3.get("/index-provinces", async (req, res) => {
  res.send(await new ProvinceRepository().index());
});
const random_id$1 = () => Math.floor(Math.random() * 615131613);
const media_db = "api/database/media.json";
class MediaRepository {
  async index(course_id = null) {
    return new Promise((resolve, reject) => {
      fs__default.readFile(media_db, "utf8", async (err, res) => {
        if (err) {
          fs__default.writeFile(media_db, "[]", (err2, res2) => res2);
        }
        let media = JSON.parse(res);
        if (course_id) {
          resolve(media.filter((v) => v.course_id == course_id));
        }
        resolve(media);
      });
    });
  }
  async create(req = {}) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, async function(err, fields, files) {
        if (err)
          console.error(err);
        const course_id = fields.course_id;
        if (course_id == "undefined") {
          reject("no course id provided");
          return;
        }
        let media = await new MediaRepository().index(course_id);
        for (let item in files) {
          const media_id = random_id$1();
          const userPath = files[item].filepath;
          const ext = () => files[item].originalFilename.includes("mp4") ? ".mp4" : ".jpg";
          const media_path = `api/storage/media/course_${course_id}/media_${media_id + ext()}`;
          media.push({
            id: media_id,
            course_id,
            src: "/" + media_path
          });
          try {
            fs__default.mkdir(
              `api/storage/media/course_${course_id}`,
              (err2, res) => null
            );
          } catch (err2) {
          }
          fs__default.copyFile(userPath, media_path, function(err2) {
            if (err2) {
              reject(err2);
              return;
            }
          });
        }
        fs__default.writeFile(media_db, JSON.stringify(media), async (err2, res) => {
          if (err2) {
            reject(err2);
          }
        });
        resolve(media);
      });
    });
  }
  async delete(media_id) {
    async function fromDir(startPath, filter) {
      if (!fs__default.existsSync(startPath)) {
        return;
      }
      var files = fs__default.readdirSync(startPath);
      for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs__default.lstatSync(filename);
        if (stat.isDirectory()) {
          fromDir(filename, filter);
        } else if (filename.includes(filter)) {
          fs__default.unlinkSync(filename);
        }
      }
    }
    try {
      await fromDir("api/storage", `media_${media_id}`);
    } catch (e) {
    }
    let media = await this.index();
    media.splice(media.indexOf(media.find((v) => v.id == media_id)), 1);
    return new Promise((resolve, reject) => {
      fs__default.writeFile(media_db, JSON.stringify(media), (err, res) => {
        if (err)
          reject(err);
        resolve(media);
      });
    });
  }
}
const router$2 = express.Router();
router$2.get("/index-media/:course_id", async (req, res) => {
  res.send(await new MediaRepository().index(req.params["course_id"]));
});
router$2.post("/create-media", async (req, res) => {
  res.send(await new MediaRepository().create(req));
});
router$2.delete("/delete-media/:id", async (req, res) => {
  res.send(await new MediaRepository().delete(req.params["id"]));
  express();
});
const router$1 = express.Router();
router$1.get("/index-attendant/:course_id?", async (req, res) => {
  res.send(await new AttendantRepository().index(req.params["course_id"]));
});
router$1.post("/create-attendant", async (req, res) => {
  res.send(await new AttendantRepository().create(req.body));
});
router$1.get(`/show-attendant/:id`, async (req, res) => {
  res.send(await new AttendantRepository().show(req.params["id"]));
});
router$1.get(`/show-attendant-by-NC/:NC`, async (req, res) => {
  res.send(await new AttendantRepository().show_by_NC(req.params["NC"]));
});
router$1.put("/update-attendant/:id", async (req, res) => {
  res.send(await new AttendantRepository().update(req.params["id"], req.body));
});
router$1.delete("/delete-attendant/:id", async (req, res) => {
  res.send(await new AttendantRepository().delete(req.params["id"]));
});
const random_id = () => Math.floor(Math.random() * 615131613);
const TeacherModel = {
  get(data) {
    return {
      id: data.id,
      name: data.name,
      national_code: data.national_code,
      education: data.education,
      courses_taught: data.courses_taught,
      total_hours_taught: data.total_hours_taught,
      bank_account: data.bank_account
    };
  },
  set(data) {
    return {
      id: data.id || random_id(),
      name: data.name,
      national_code: data.national_code,
      education: data.education || null,
      courses_taught: data.courses_taught || [],
      total_hours_taught: data.total_hours_taught || 0,
      bank_account: data.bank_account || null
    };
  }
};
const teachers_path = "api/database/teachers.json";
class TeacherRepository {
  async index() {
    return new Promise((resolve, reject) => {
      fs__default.readFile(teachers_path, "utf8", async (err, res) => {
        if (err) {
          fs__default.writeFile(teachers_path, "[]", (err2, res2) => res2);
        }
        let teachers = JSON.parse(res);
        resolve(teachers.map((v) => TeacherModel.get(v)));
      });
    });
  }
  async create(teacher_data) {
    let teachers = await this.index();
    const new_teacher = TeacherModel.set(teacher_data);
    if (Object.values(new_teacher).find((v) => !v) !== void 0) {
      teachers.push(new_teacher);
    }
    return new Promise((resolve, reject) => {
      try {
        fs__default.writeFile(teachers_path, JSON.stringify(teachers), () => {
          resolve(new_teacher);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async show(teacher_id) {
    let teachers = await this.index();
    return teachers.find(
      (v) => v.id == teacher_id ? TeacherModel.get(v) : null
    );
  }
  async update(teacher_id, teacher_data) {
    let teachers = await this.index();
    teacher_data = TeacherModel.set(teacher_data);
    let found = teachers.find((v) => v.id == teacher_id);
    if (!found) {
      return `no teacher found by id ${teacher_id} to update!`;
    }
    if (found.name && found.national_code) {
      for (let item in teacher_data) {
        found[item] = teacher_data[item];
      }
    } else {
      return;
    }
    return new Promise((resolve, reject) => {
      fs__default.writeFile(teachers_path, JSON.stringify(teachers), (err, res) => {
        if (err)
          reject(err);
        resolve(teachers);
      });
    });
  }
  async delete(teacher_id) {
    let teachers = await this.index();
    let found = teachers.find((v) => v.id == teacher_id);
    teachers.splice(teachers.indexOf(found), 1);
    return new Promise((resolve, reject) => {
      fs__default.writeFile(teachers_path, JSON.stringify(teachers), (err, res) => {
        if (err)
          reject(err);
        resolve(teachers.map((v) => TeacherModel.get(v)));
      });
    });
  }
}
const router = express.Router();
router.get("/index-teacher", async (req, res) => {
  res.send(await new TeacherRepository().index());
});
router.post("/create-teacher", async (req, res) => {
  res.send(await new TeacherRepository().create(req.body));
});
router.get(`/show-teacher/:id`, async (req, res) => {
  res.send(await new TeacherRepository().show(req.params["id"]));
});
router.put("/update-teacher/:id", async (req, res) => {
  res.send(await new TeacherRepository().update(req.params["id"], req.body));
});
router.delete("/delete-teacher/:id", async (req, res) => {
  res.send(await new TeacherRepository().delete(req.params["id"]));
});
const app = express();
app.use(body_parser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  router$4,
  router$3,
  router$2,
  router$1,
  router
);
const handler = app;
export {
  handler
};
