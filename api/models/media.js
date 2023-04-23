const random_id = () => Math.floor(Math.random() * 615131613);
module.exports = {
  get(data) {
    return {
      id: data.id,
      course_id: data.course_id,
      src: data.src,
    };
  },
  set(data) {
    return {
      id: random_id(),
      course_id: data.course_id,
      src: data.src,
    };
  },
};
