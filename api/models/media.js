export default {
  get(data) {
    return {
      id: data.id,
      course_id: data.course_id,
      src: data.src,
    };
  }
};
