const random_id = () => Math.floor(Math.random() * 615131613);

export default {
  get(data) {
    return {
      id: data.id,
      province_id: data.province_id,
      name: data.name,
      number: data.number,
      members_quantity: data.members_quantity || null,
      start_date: data.start_date || null,
      finish_date: data.finish_date || null,
      total_hours_participated_in: data.total_hours_participated_in || null,
    };
  },
  set(data) {
    return {
      id: data.id || random_id(),
      name: data.name,
      number: data.number,
      members_quantity: data.members_quantity || null,
      start_date: data.start_date || null,
      finish_date: data.finish_date || null,
      total_hours_participated_in: data.total_hours_participated_in || null,
    };
  },
};
