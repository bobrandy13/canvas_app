const BASE_URL =
  "https://cths.instructure.com/api/v1/courses?enrollment_type=student&enrollment_state=active&per_page=100&";
const fetchCourses = async () => {
  let return_obj = {};
  fetch(BASE_URL + "access_token=" + process.env.CANVAS_API_TOKEN)
    .then((data) => data.json())
    .then((res: Array<object>) => {
      // console.log(res);
      // console.log(res);
      console.log("REs", res);
      return res;
    });
  console.log(return_obj);
  return return_obj;
};

export default fetchCourses;
