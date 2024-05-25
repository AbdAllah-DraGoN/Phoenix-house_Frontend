const propId = location.search.slice(1);

// ==========================================
if (user != null && user.isAdmin == true) {
  getPropertyInfoByAdmin(propId);
} else {
  getPropertyInfoByUser(propId);
}
let imagesNameAR = [];
// ==========================================
function getPropertyInfoByAdmin(propId) {
  toggleLoader();
  axios
    .get(`${baseUrl}/Admin/property/${propId}`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      const prop = response.data.data[0];
      prop.image.forEach((img) => {
        imagesNameAR.push(img.url);
      });
      setPropertyInfo(prop, imagesNameAR);
      checkFavs();
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
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
// ==========================================
// ==========================================
function getPropertyInfoByUser(propId) {
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
      prop.image.forEach((img) => {
        imagesNameAR.push(img.url);
      });
      setPropertyInfo(prop, imagesNameAR);
      if (user != null) {
        checkFavs();
      }
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
      showAlert("حدث خطأ ما يرجى المحاولة لاحقا", "danger");
    });
}
// =================================
// =================================

// ==============
function setPropertyInfo(prop, images) {
  let finance, furnish;
  prop.financing == true ? (finance = "نعم") : (finance = "لا");
  prop.furnished == true ? (furnish = "مفروش") : (furnish = "غير مفروش");
  // ==================
  // ======== For Admin ========
  let infoForAdmin;
  if (user != null && user.isAdmin == true) {
    infoForAdmin = `
    <span class="sm">إسم المعلن: ${prop.user.name}</span>
    <span class="sm">الهاتف: ${prop.user.phone}</span>
  <span class="sm">نوع المعلن: ${prop.advertiser_type} </span>
  <span class="sm">الكود: ${prop.code} </span>
  `;
  } else {
    infoForAdmin = ``;
  }
  // ==================
  let theBtn;
  if (user != null) {
    if (user.id == prop.userId || user.isAdmin == true) {
      theBtn = `
    <span class="bttn" onclick="deletePropertyClicked('${prop.id}')" style="color: var(--text-second-coler);">حذف</span>
    `;
    } else {
      theBtn = `
    <span class="bttn" onclick="msgFromProperty('${prop.id}')">مراسلة</span>
    `;
    }
  } else {
    theBtn = `
    <span class="bttn" onclick="showUnauth()">مراسلة</span>
    `;
  }
  // ===================
  // if (prop.image != null) {
  //   if (prop.image.length != 0) {
  //     imgUrl = prop.image[0].url;
  //   } else {
  //     imgUrl = "";
  //   }
  // } else {
  //   imgUrl = "";
  // }
  // ==================
  let propertyContent = `
<section class="property" id="${prop.id}">
  <img src="images/Backgrounds/mobile-back.png" class="mobile-back" />
  <div class="container">
    <div class="head">
      <div class="img-container">
        <img src="./public/images/${
          images[0]
        }" onclick="openImages('${encodeURIComponent(
    JSON.stringify(images)
  )}')" id="propImg" style="max-width: 100%;max-height: 100%;cursor: pointer;border-radius: 0.5rem;" alt="صورة العقار هتظهر فى خلال لحظات ...."/>
      </div>
      <div class="box">
        <span class="sm">الغرض: ${prop.purpose} </span>
        <span class="sm">القسم: ${prop.category.name}</span>
        <span class="sm">عدد الغرف: ${prop.rooms_number} </span>
        <span class="sm">عدد الحمامات: ${prop.bathrooms_number} </span>
        <span class="sm">المساحة: ${prop.area}م </span>
        <span class="sm">الدور: ${prop.floor_number} </span>
        <span class="sm">التشطيب: ${prop.finishing} </span>
        <span class="sm">الفرش: ${furnish} </span>
        <span class="sm">سعر المتر: ${prop.meter_price}ج </span>
        <span class="sm" style="padding-left: 0 !important;padding-right: 0.3rem !important;">إجمالى السعر: ${
          prop.price
        }ج </span>
      </div>
    </div>
    <div class="land">
      <span class="sm">المحافظة: ${prop.governorate.name}</span>
      <span class="sm">المنطقة: ${prop.district.name}</span>
      <span class="sm">إمكانية التمويل العقارى: ${finance} </span>
      <span class="sm">طريقة الدفع: ${prop.payment_type} </span>
      <span class="lg">الموقع بالتفصيل: ${prop.location} </span>
      <span class="lg">الموضوع: ${prop.subject} </span>
      <span class="lg">وصف دقيق: ${prop.description} </span>
      ${infoForAdmin}
    </div>
    <div class="foot">
      ${theBtn}
      <input type="hidden" id="favStatue" value="false" />
      <ul class="icon" onclick="favClicked('${prop.id}')">
        <i class="fa-regular fa-heart lg-icon" id="favFalse"></i>
        <i class="fa-solid fa-heart lg-icon-v" id="favTrue"></i>
      </ul>
      <span class="bttn" onclick="goBackBtn()">رجوع</span>
    </div>
  </div>
</section>
`;
  document.getElementById("propertyContainer").innerHTML = propertyContent;
}
// =================================================
// =================================================

function msgFromProperty(propId) {
  location = `./message.html?${propId}`;
}
// =====================
function deletePropertyClicked(id) {
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("delete-property-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("property-id-input").value = `${id}`;
}
let deleteMsg;
// =====================
function confirmDeleteProperty() {
  const id = document.getElementById("property-id-input").value;
  let delCause = document.getElementById("delete-property-cause-msg").value;
  let delMsg = document.getElementById("delete-property-msg").value;
  //
  if (user == null) {
    showAlert("خطأ فى تسجيل الدخول، سجل دخول مرة أخرى");
    return;
  }
  let params = {};
  let role = "user";
  //
  if (user.isAdmin == true) {
    role = "admin";
    params = {
      urls: imagesNameAR,
    };
  } else {
    role = "user";
    if (delCause == "") {
      showAlert("يجب عليك إختيار سبب الحذف من القائمة", "danger");
      return;
    } else {
      deleteMsg = `سبب الحذف: ${delCause} -- الرسالة: ${delMsg}  `;
    }
  }
  // --------------------------------

  axios
    .delete(`${baseUrl}/${role}/property/delete/${id}`, {
      data: params,
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      console.log(response);
      // =====================
      if (user.isAdmin != true) {
        sendDelMsg(deleteMsg, id);
      }
      // =====================
      showAlert(response.data.message);
      toggleLoader();
      setTimeout(() => {
        toggleLoader(false);
        location = "./index.html";
      }, 1500);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
      showAlert(error.response.data.message, "danger");
    });
}
// =====================
function sendDelMsg(msgContent, details) {
  const params = {
    content: msgContent,
  };
  if (details != "") {
    params.details = `${details}`;
  }
  const token = localStorage.getItem("Is_My_Token");

  if (token == null) {
    showAlert("خطأ فى تسجيل الدخول، سجل دخول مرة أخرى");
    showAlert("جارى الإنتقال لصفحة تسجيل الدخول");
    toggleLoader();

    setTimeout(() => {
      toggleLoader(false);
      location = `./login.html`;
    }, 2500);
    return;
  }
  toggleLoader();
  // Start Request
  axios
    .post(`${baseUrl}/user/message`, params, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
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

// =====================================================
// =====================================================
// =================== Fav Section =====================
function checkFavs() {
  toggleLoader();
  axios
    .get(`${baseUrl}/user/favorite/all?limit=100&page=1`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      //--------------------------
      let favProperties = response.data.data[0];
      favProperties.forEach((el) => {
        if (
          el.propertyId ==
          document.getElementById("propertyContainer").children[0].id
        ) {
          document.getElementById("favTrue").style.cssText =
            "display: block !important;color: var(--text-second-coler);";
          document.getElementById("favFalse").style.cssText =
            "display: none !important";
          document.getElementById("favStatue").value = true;
        }
      });
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
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
// =====================================================
function favClicked(id) {
  if (token == null) {
    showAlert("يجب عليك تسجيل الدخول لتتمكن من الإضافة الى المفضلة", "danger");
    return;
  }
  const params = {};
  if (document.getElementById("favStatue").value == "false") {
    axios
      .post(`${baseUrl}/user/favorite/add/${id}`, params, {
        headers: {
          "x-api-key": apiKey,
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toggleLoader(false);
        // console.log(response);
        document.getElementById("favTrue").style.cssText =
          "display: block !important;color: var(--text-second-coler);";
        document.getElementById("favFalse").style.cssText =
          "display: none !important";
        document.getElementById("favStatue").value = true;
        showAlert("تم إضافة العقار الى المفضة");
      })
      .catch((error) => {
        toggleLoader(false);
        console.log(error);
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
  } else if (document.getElementById("favStatue").value == "true") {
    axios
      .delete(`${baseUrl}/user/favorite/remove/${id}`, {
        headers: {
          "x-api-key": apiKey,
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toggleLoader(false);
        // console.log(response);
        document.getElementById("favTrue").style.cssText =
          "display: none !important";
        document.getElementById("favFalse").style.cssText =
          "display: block !important";
        document.getElementById("favStatue").value = false;
        showAlert("تم حذف العقار من المفضة");
      })
      .catch((error) => {
        toggleLoader(false);
        console.log(error);
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
// =====================================================
// =====================================================
// Open Image Slider Page
function openImages(imagesCode) {
  location = `./imageSlider.html?${imagesCode}`;
}
// =====================================================
function showUnauth() {
  showAlert("يجب عليك تسجيل الدخول لتتمكن من إرسال رسالة", "danger");
}
