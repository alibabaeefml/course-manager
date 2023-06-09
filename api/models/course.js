const random_id = () => Math.floor(Math.random() * 615131613);

export default {
  get(data) {
    return {
      id: data.id,
      province_id: data.province_id,
      name: data.name,
      number: data.number,
      members_quantity: data.members_quantity,
      start_date: data.start_date,
      finish_date: data.finish_date,
      total_hours_attended: data.total_hours_attended ,
    };
  },
  set(data) {
    return {
      id: data.id || random_id(),
      province_id: data.province_id,
      name: data.name,
      number: data.number || null,
      members_quantity: data.members_quantity || null,
      start_date: data.start_date || null,
      finish_date: data.finish_date || null,
      total_hours_attended: data.total_hours_attended || null,
    };
  },
};

//[{a:2},{a:5}].map(v=>v.a + 1).reduce((a,b)=>a+b) course population
