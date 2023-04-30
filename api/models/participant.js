const random_id = () => Math.floor(Math.random() * 615131613);

export default {
  get(data) {
    return {
      id: data.id,
      province_id: data.province_id,
      city: data.city,
      police_rank: data.police_rank,
      first_name: data.first_name,
      last_name: data.last_name,
      personal_number: data.personal_number,
      national_code: data.national_code,
      department: data.department,
      is_primary: data.is_primary,
      family_member_no: data.family_member_no,
      first_name: data.first_name,
      under_two_year_old_children_quantity:
        data.under_two_year_old_children_quantity,
      over_two_year_old_children_quantity:
        data.over_two_year_old_children_quantity,
      phone_number: data.phone_number,
      total: data.total,
      total_hours_attended: data.total_hours_attended,
    };
  },
  set(data) {
    return {
  
    };
  },
};

