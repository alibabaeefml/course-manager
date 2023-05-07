import CourseModel from "./course";
const random_id = () => Math.floor(Math.random() * 615131613);

export default {
  get(data) {
    return {
      id: data.id,
      name: data.name,
      national_code: data.national_code,
      education: data.education,
      courses_taught: data.courses_taught,
      total_hours_taught: data.total_hours_taught,
      bank_account: data.bank_account,
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
      bank_account: data.bank_account || null,
    };
  },
};
