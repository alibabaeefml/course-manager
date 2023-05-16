import RelativeModel from "./relative";
const random_id = () => Math.floor(Math.random() * 615131613);

export default {
  get(data) {
    return {
      id: data.id,
      course_id: data.course_id,
      province_id: data.province_id,
      police_rank: data.police_rank,
      first_name: data.first_name,
      last_name: data.last_name,
      personal_number: data.personal_number,
      national_code: data.national_code,
      department: data.department,
      is_primary: data.is_primary ? true : false,
      family_members: data.family_members,
      under_two_year_old_children_quantity:
        data.under_two_year_old_children_quantity,
      over_two_year_old_children_quantity:
        data.over_two_year_old_children_quantity,
      phone_number: data.phone_number,
      attendance_time: data.attendance_time,
      relatives: data.relatives.length
        ? data.relatives.map((r) => RelativeModel.get(r))
        : [],
    };
  },
  set(data) {
    return {
      id: data.id || random_id(),
      course_id: data.course_id,
      province_id: data.province_id,
      police_rank: data.police_rank,
      first_name: data.first_name,
      last_name: data.last_name,
      personal_number: data.personal_number,
      national_code: data.national_code,
      department: data.department,
      is_primary: data.is_primary ? 1 : 0,
      family_members: data.family_members,
      under_two_year_old_children_quantity:
        data.under_two_year_old_children_quantity,
      over_two_year_old_children_quantity:
        data.over_two_year_old_children_quantity,
      phone_number: data.phone_number,
      attendance_time: data.attendance_time,
      relatives: data.relatives.length
        ? data.relatives.map((r) => RelativeModel.set(r))
        : [],
    };
  },
};
