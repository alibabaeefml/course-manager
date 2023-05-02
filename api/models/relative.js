export default {
  get(data) {
    return {
      name: data.name,
      relation: data.relation,
      attendance_time: data.attendance_time,
    };
  },
  set(data) {
    return {
      name: data.name,
      relation: data.relation,
      attendance_time: data.attendance_time,
    };
  },
};