getCategories();
getGovernoratesAndDistrict();
// ======================================
let lastImgs = 0;
// ===== If User Will Edit His Property
const propId = location.search.slice(1);
//
if (propId != null && propId != "") {
  getPropertyInfoForEdit(propId);
  document.getElementById("submitBtn").innerHTML = "تأكيد";
} else {
  document.getElementById("submitBtn").innerHTML = "ضيف عقارك";
}
// ======================================

// ======================================
// ======================================
// =================
document
  .getElementById("createProp")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

document.getElementById("images").addEventListener("change", () => {
  if (lastImgs + document.getElementById("images").files.length > 12) {
    showAlert("اقصى عدد لمجموع الصور 12 صورة", "danger");
    showAlert(
      "سيتم حفظ أول 12 صورة فقط فى العقار وسيتم تجاهل الباقى",
      "danger"
    );
  }
  let imgSize = true;
  for (let i = 0; i < document.getElementById("images").files.length; i++) {
    if (document.getElementById("images").files[i].size > 5242000) {
      imgSize = false;
    }
  }
  if (imgSize == false) {
    showAlert("اقصى حجم للصورة الواحدة 5 ميجابايت", "danger");
    showAlert("سيتم تجاهل الصور التى حجمها أكبر من 5 ميجابايت", "danger");
  }
});
let searchAr = [
  document.getElementById("purpose"),
  document.getElementById("furnished"),
  document.getElementById("financing"),
  document.getElementById("governorateId"),
  document.getElementById("districtId"),
  document.getElementById("finishing"),
  document.getElementById("categoryId"),
  document.getElementById("floor_number"),
  document.getElementById("price"),
  document.getElementById("area"),
  document.getElementById("rooms_number"),
  document.getElementById("bathrooms_number"),
  document.getElementById("payment_type"),
  document.getElementById("description"),
  document.getElementById("location"),
  document.getElementById("meter_price"),
  document.getElementById("advertiser_type"),
  document.getElementById("subject"),
];

let [
    progPurpose,
    progFurnished,
    progFinancing,
    progGovernorateId,
    progDistrictId,
    progFinishing,
    progcategoryId,
    progFloor_number,
    progPrice,
    progArea,
    progRooms_number,
    progBathrooms_number,
    progPayment_type,
    progDescription,
    progLocation,
    progMeter_price,
    progAdvertiser_type,
    propSubject,
  ] = searchAr,
  progCode = document.getElementById("code"),
  progImages = document.getElementById("images");

document.getElementById("advertiser_type").addEventListener("change", () => {
  if (document.getElementById("advertiser_type").value == "فريق عمل") {
    if (document.getElementById("code").hasAttribute("disabled")) {
      document.getElementById("code").removeAttribute("disabled");
      document.getElementById("code").style.opacity = "1";
    }
  } else {
    if (!document.getElementById("code").hasAttribute("disabled")) {
      document.getElementById("code").setAttribute("disabled", "disabled");
      document.getElementById("code").style.opacity = "0.8";
      document.getElementById("code").value = "";
    }
  }
});
function addPropClicked() {
  // Validatio
  let validation = true;
  searchAr.forEach((el) => {
    if (el.value == "") {
      validation = false;
    }
  });
  if (document.getElementById("images").files.length == 0 && propId == "") {
    validation = false;
  }
  if (!validation) {
    showAlert("يجب ملئ كل الحقول المطلوبة", "danger");
    return;
  }
  // -----------------------------------------
  const images = document.getElementById("images").files;
  let imglength;
  if (lastImgs > 0) {
    if (images.length + lastImgs > 12) {
      imglength = 12 - lastImgs;
    } else {
      imglength = images.length;
    }
    //
  } else if (images.length > 12) {
    imglength = 12;
  } else {
    imglength = images.length;
  }

  // parms To form data
  let formData = new FormData();
  formData.append("purpose", progPurpose.value);
  formData.append("subject", propSubject.value);
  formData.append("description", progDescription.value);
  formData.append("finishing", progFinishing.value);
  formData.append("advertiser_type", progAdvertiser_type.value);
  formData.append("meter_price", progMeter_price.value);
  formData.append("payment_type", progPayment_type.value);
  formData.append("floor_number", progFloor_number.value);
  formData.append("rooms_number", progRooms_number.value);
  formData.append("bathrooms_number", progBathrooms_number.value);
  formData.append("financing", progFinancing.value);
  formData.append("furnished", progFurnished.value);
  formData.append("area", progArea.value);
  formData.append("categoryId", progcategoryId.value);
  formData.append("districtId", progDistrictId.value);
  formData.append("governorateId", progGovernorateId.value);
  formData.append("location", progLocation.value);
  formData.append("price", progPrice.value);
  //
  let trueImgSize = false;
  //
  for (let i = 0; i < imglength; i++) {
    if (images[i].size < 5242000) {
      formData.append("images", images[i]);
      trueImgSize = true;
    }
  }
  //
  if (!trueImgSize && propId == "") {
    showAlert(
      "يجب إضافة صورة واحدة على الأقل وحجمها لا يتعدى 5 ميجابايت",
      "danger"
    );
    return;
  }
  //
  if (progCode.value != "") {
    formData.append("code", progCode.value);
  }
  const token = localStorage.getItem("Is_My_Token");
  toggleLoader(true);
  // Start Request
  if (propId != null && propId != "") {
    // in edit case
    axios
      .put(`${baseUrl}/user/property/update/${propId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": apiKey,
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toggleLoader(false);
        // console.log(response);
        showAlert(response.data.message);
        toggleLoader();
        setTimeout(() => {
          toggleLoader(false);
          location = "./userProperties.html";
        }, 1500);
      })
      .catch((error) => {
        toggleLoader(false);
        console.log(error);
        showAlert(error.response.data.message, "danger");
        // If The Token Time Finished
        if (
          error.response.data.message != null &&
          error.response.data.message != undefined
        ) {
          if (
            error.response.data.message == "Unauthorized" ||
            error.response.data.message == "jwt expired"
          ) {
            showAlert(
              "إنتهت صلاحية الجلسة ، أعد تسجيل الدخول مرة أخرى",
              "danger"
            );
          }
        }
      });
  } else {
    // in create case
    axios
      .post(`${baseUrl}/user/property/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": apiKey,
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toggleLoader(false);
        // console.log(response);
        showAlert("تمت الإضافة بنجاح");
        toggleLoader();
        setTimeout(() => {
          toggleLoader(false);
          location = "./all_properties.html";
        }, 1500);
      })
      .catch((error) => {
        toggleLoader(false);
        console.log(error);
        showAlert(error.response.data.message, "danger");
        // If The Token Time Finished
        if (
          error.response.data.message != null &&
          error.response.data.message != undefined
        ) {
          if (
            error.response.data.message == "Unauthorized" ||
            error.response.data.message == "jwt expired"
          ) {
            showAlert(
              "إنتهت صلاحية الجلسة ، أعد تسجيل الدخول مرة أخرى",
              "danger"
            );
          }
        }
      });
  }
}

// =================
// =================
// =================
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
        // console.log(el);
        document.getElementById(
          "governorateId"
        ).innerHTML += `<option value="${el.id}">${el.name}</option>`;
        el.district.forEach((ele) => {
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

/*
=====================
*/
function getPropertyInfoForEdit(propId) {
  toggleLoader();
  axios
    .get(`${baseUrl}/user/property/${propId}`, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      const prop = response.data.data[0];
      progPurpose.value = prop.purpose;
      propSubject.value = prop.subject;
      progDescription.value = prop.description;
      progFinishing.value = prop.finishing;
      progAdvertiser_type.value = prop.advertiser_type;
      progMeter_price.value = prop.meter_price;
      progPayment_type.value = prop.payment_type;
      progFloor_number.value = prop.floor_number;
      progRooms_number.value = prop.rooms_number;
      progBathrooms_number.value = prop.bathrooms_number;
      progFinancing.value = prop.financing;
      progFurnished.value = prop.furnished;
      progArea.value = prop.area;
      progLocation.value = prop.location;
      progPrice.value = prop.price;
      progCode.value = prop.code;
      lastImgs = prop.image.length;
      setTimeout(() => {
        progcategoryId.value = prop.category.id;
        progDistrictId.value = prop.district.id;
        progGovernorateId.value = prop.governorate.id;
      }, 500);
    })
    .catch((error) => {
      toggleLoader(false);
      showAlert(error.response.data.message, "danger");
      console.log(error);
    });
}
