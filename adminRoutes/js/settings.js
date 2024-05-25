// ==========================================
// Get The Ratings
getUsersRatings();
// Get Governorates And District And Categories
getGovernoratesAndDistrict();
getCategories();
// ==========================================
// ==========================================
//
function getUsersRatings() {
  const token = localStorage.getItem("Is_My_Token");
  toggleLoader();
  axios
    .get(`${baseUrl}/admin/user/ratings`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      // ================================
      let avgRate = response.data.data[0].toFixed(2);
      let countRate = response.data.data[1];
      document.getElementById("avg-ratings").innerHTML = avgRate;
      document.getElementById("count-ratings").innerHTML = countRate;
      // ================================
      // showAlert(response.data.message);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}

//=====================================================
//=====================================================

function addGovernorateBtn() {
  const token = localStorage.getItem("Is_My_Token");
  const params = {
    name: document.getElementById("governorate-input").value,
  };
  toggleLoader();
  axios
    .post(`${baseUrl}/admin/property/governorate`, params, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      // ================================
      // ================================
      showAlert(response.data.message);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}
// ----------------
function addDistrictBtn() {
  const token = localStorage.getItem("Is_My_Token");
  if (document.getElementById("district-in-governorate").value == "") {
    showAlert("يجب إختيار المحافظة التى ستضيف لها المنطقة", "danger");
    return;
  }
  const params = {
    name: document.getElementById("district-input").value,
    id: document.getElementById("district-in-governorate").value,
  };
  toggleLoader();
  axios
    .post(`${baseUrl}/admin/property/district`, params, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      // ================================
      // ================================
      showAlert(response.data.message);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}
// ----------------
function addCategoryBtn() {
  const token = localStorage.getItem("Is_My_Token");
  const params = {
    name: document.getElementById("category-input").value,
  };
  toggleLoader();
  axios
    .post(`${baseUrl}/admin/property/category`, params, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      // ================================
      // ================================
      showAlert(response.data.message);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}

// =====================================================
// =====================================================

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
      governorates.forEach((el) => {
        document.getElementById(
          "del-governorate"
        ).innerHTML += `<option value="${el.id}">${el.name}</option>`;
        document.getElementById(
          "district-in-governorate"
        ).innerHTML += `<option value="${el.id}">${el.name}</option>`;
        el.district.forEach((ele) => {
          document.getElementById(
            "del-district"
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
      categories.forEach((el) => {
        document.getElementById(
          "del-category"
        ).innerHTML += `<option value="${el.id}">${el.name}</option>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
// =====================================================
// =====================================================
function delCategoryBtn() {
  const id = document.getElementById("del-category").value;
  if (id == "") {
    showAlert("يجب إختيار القسم الذى تريد حذفه", "danger");
    return;
  }
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("delete-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("del-id-input").value = `${id}`;
  document.getElementById("del-name-input").value = `category`;
}
// =================================================================
function delDistrictBtn() {
  const id = document.getElementById("del-district").value;
  if (id == "") {
    showAlert("يجب إختيار المنطقة التى تريد حذفها", "danger");
    return;
  }
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("delete-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("del-id-input").value = `${id}`;
  document.getElementById("del-name-input").value = `district`;
}
// =================================================================
function delGovernorateBtn() {
  const id = document.getElementById("del-governorate").value;
  if (id == "") {
    showAlert("يجب إختيار المحافظة التى تريد حذفها", "danger");
    return;
  }
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("delete-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("del-id-input").value = `${id}`;
  document.getElementById("del-name-input").value = `governorate`;
}
// =================================================================
// Confirm Delete
function confirmDelete() {
  const token = localStorage.getItem("Is_My_Token");
  const id = document.getElementById("del-id-input").value;
  //-----------------------------------------------------------
  const type = document.getElementById("del-name-input").value;
  toggleLoader();
  axios
    .delete(`${baseUrl}/admin/property/${type}/${id}`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      console.log(response);
      // ================================
      // ================================
      showAlert(response.data.message);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}
//
// =================================================================
// =================================================================
// =================================================================
// =================================================================
//
function setLinkBtn(name) {
  const token = localStorage.getItem("Is_My_Token");
  let id, linkInput;
  if (name == "face") {
    id = faceId;
    linkInput = document.getElementById("face-link-input").value;
  } else if (name == "insta") {
    id = instaId;
    linkInput = document.getElementById("insta-link-input").value;
  } else if (name == "tiktok") {
    id = tiktokId;
    linkInput = document.getElementById("tiktok-link-input").value;
  } else if (name == "youtube") {
    id = youtubeId;
    linkInput = document.getElementById("youtube-link-input").value;
  }

  const params = {
    url: linkInput,
  };
  toggleLoader();
  axios
    .put(`${baseUrl}/admin/profile-links/update/${id}`, params, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      // ================================
      showAlert(response.data.message);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
      showAlert(error.response.data.message, "danger");
      if (
        error.response.data.error != null ||
        error.response.data.error != undefined
      ) {
        showAlert(error.response.data.error[0].message, "danger");
      }
    });
}
