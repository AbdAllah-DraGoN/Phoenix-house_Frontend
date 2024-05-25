getGovernoratesAndDistrict();
getCategories();
// ===========================
function getGovernoratesAndDistrict() {
  axios
    .get(`${baseUrl}/admin/property/governorate`, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((response) => {
      // console.log(response);
      let governorates = response.data.data;
      // console.log(governorates);
      governorates.forEach((el) => {
        // console.log(el);
        document.getElementById(
          "governorateId"
        ).innerHTML += `<option value="${el.id}">${el.name}</option>`;
        el.district.forEach((ele) => {
          // console.log(ele);
          document.getElementById(
            "districtId"
          ).innerHTML += `<option value="${ele.id}">${ele.name}</option>`;
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
// =================
// =================
// =================
function getCategories() {
  axios
    .get(`${baseUrl}/admin/property/category`, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((response) => {
      // console.log(response);
      let categories = response.data.data;
      // console.log(categories);
      categories.forEach((el) => {
        // console.log(el);
        document.getElementById(
          "categoryId"
        ).innerHTML += `<option value="${el.id}">${el.name}</option>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let searchAr = [
      document.getElementById("purpose"),
      document.getElementById("furnished"),
      document.getElementById("financing"),
      document.getElementById("governorateId"),
      document.getElementById("districtId"),
      document.getElementById("finishing"),
      document.getElementById("categoryId"),
      document.getElementById("floor_number"),
      document.getElementById("minPrice"),
      document.getElementById("maxPrice"),
      document.getElementById("minArea"),
      document.getElementById("maxArea"),
      document.getElementById("rooms_number"),
      document.getElementById("payment_type"),
    ];
    let qyeParams = "?";
    searchAr.forEach((el) => {
      if (el.value != "") {
        qyeParams += `${el.id}=${el.value}&`;
      }
    });
    // console.log(qyeParams);
    location = `./all_properties.html${qyeParams}`;
  });
