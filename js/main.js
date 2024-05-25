const baseUrl = "*********************************************";
const apiKey = "**************************************************";
// ===================================
const token = localStorage.getItem("Is_My_Token");
const user = getCurrentUser();
// =======================================
// =======================================
// Links Id
// const faceId = "e259b60e-42a7-4072-8861-ed17cb1f3f1e";
// const instaId = "8a7e0084-e9ca-4abe-add4-52f6fc8dfc03";
// const tiktokId = "3f015a54-1b68-4be0-9431-d3bbdb83d36c";
// const youtubeId = "e259b60e-42a7-4072-8861-ed17cb1f3f1e";
let faceId;
let instaId;
let tiktokId;
let youtubeId;
// =======================================
// =======================================
// =======================================
let userName = "";
if (user != null) {
  userName = user.name;
} else {
  userName = "";
}
// =======================================
toggleLoader(false);
let mainNavbarContent = `
<div class="container">
  <a href="index.html" class="logo">
    <img src="./images/logo/main-logo.png" alt="" />
  </a>
  <div class="menu">
    <div class="menu-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="menu-box">
      <li class="menu-logo">
        <img src="./images/logo/menu-logo.png" alt="" />
      </li>
      <span class="name-in-phone" id="name-in-phone">${userName}</span>
      <li class="log-in bttn btn-in-phone" id="btn-in-phone">
        <a onclick="logoutBtnClicked()">تسجيل الخروج</a>
      </li>
      <li class="contact-us bttn">
        <a href="./services.html">خدماتنا</a>
      </li>
      <li class="log-in bttn" id="loginBtn">
        <a href="./login.html">تسجيل الدخول</a>
      </li>

      <li
        class="log-in bttn account-li"
        id="account-li"
        style="color: var(--text-second-coler)"
      >
        <span
          class="account-title"
          id="account-title"
          onclick="toggleBox()"
          >الحساب</span
        >
        <span class="account-box" id="account-box">
          <span>${userName}</span>
          <a onclick="logoutBtnClicked()">تسجيل الخروج</a>
        </span>
      </li>
      <li class="fav bttn">
        <a id="btnToMyFavPage">
          المفضلة<i
            class="fa-solid fa-heart btn-ico"
            style="color: #d10000"
          ></i
        ></a>
      </li>
      <li class="my-show bttn">
        <a id="btnToMyPropsPage"
          >إعلانى<i class="fa-solid fa-user btn-ico"></i
        ></a>
      </li>
      <li class="so-icons" target="_blank">
      <a id="face-link">
        <i class="fa-brands fa-facebook-f so-ico"></i>
      </a>
      <a id="insta-link" target="_blank">
        <i class="fa-brands fa-instagram so-ico"></i>
      </a>
      <a id="youtube-link" target="_blank">
        <i class="fa-brands fa-youtube so-ico"></i>
      </a>
      <a id="tiktok-link" target="_blank">
        <i class="fa-brands fa-tiktok so-ico"></i>
      </a>
      </li>
      <li class="msg-logo">
        <a id="btnToMsgPage1">
          <img src="./images/logo/phone-msg-logo.png" alt=""
        /></a>
      </li>
      <li class="rating">
        <form action="" class="stars">
          <!-- <input type="submit" value="إرسال" /> -->
          <input
            type="radio"
            name="str"
            value="5"
            id="star5"
            class="star5"
          />
          <label for="star5" onclick="ratingClicked(5)">
            <i class="fa-regular fa-star str-ico no"></i>
            <i class="fa-solid fa-star str-ico yes"></i>
          </label>

          <input
            type="radio"
            name="str"
            value="4"
            id="star4"
            class="star4"
          />
          <label for="star4" onclick="ratingClicked(4)">
            <i class="fa-regular fa-star str-ico no"></i>
            <i class="fa-solid fa-star str-ico yes"></i>
          </label>

          <input
            type="radio"
            name="str"
            value="3"
            id="star3"
            class="star3"
          />
          <label for="star3" onclick="ratingClicked(3)">
            <i class="fa-regular fa-star str-ico no"></i>
            <i class="fa-solid fa-star str-ico yes"></i>
          </label>

          <input
            type="radio"
            name="str"
            value="2"
            id="star2"
            class="star2"
          />
          <label for="star2" onclick="ratingClicked(2)">
            <i class="fa-regular fa-star str-ico no"></i>
            <i class="fa-solid fa-star str-ico yes"></i>
          </label>

          <input
            type="radio"
            name="str"
            value="1"
            id="star1"
            class="star1"
            
          />
          <label for="star1" onclick="ratingClicked(1)">
            <i class="fa-regular fa-star str-ico no"></i>
            <i class="fa-solid fa-star str-ico yes"></i>
          </label>
        </form>
      </li>
    </ul>
  </div>
</div>
`;
if (document.getElementById("main-navbar") != null) {
  document.getElementById("main-navbar").innerHTML = mainNavbarContent;
}
// ----------------------------------------------
setupUI();
getLinks();
let userHasRating, userRating, ratingId;
if (user != null && token != null) {
  getUserRating();
}
// ----------------------------------------------
//
function setupUI() {
  const user = getCurrentUser();
  const theToken = localStorage.getItem("Is_My_Token");

  const isAdmin = document.getElementById("adminPages");
  if (theToken == null) {
    if (document.getElementById("main-navbar") != null) {
      // ======= Auth Btns Setup
      document.getElementById("account-box").classList.add("hidden-now");
      document.getElementById("account-li").classList.add("hidden-now");
      // -----------------
      document.getElementById("name-in-phone").classList.add("hidden-now");
      document.getElementById("btn-in-phone").classList.add("hidden-now");
      // -----------------
      document.getElementById("loginBtn").classList.remove("hidden-now");
      // ==================================
      // ================= Pages Setup
      document.getElementById("btnToMyFavPage").href = "./login.html";
      document.getElementById("btnToMyPropsPage").href = "./login.html";
      document.getElementById("btnToMsgPage1").href = "./login.html";
    }
    if (document.getElementById("btnToMsgPage2") != null) {
      document.getElementById("btnToMsgPage2").href = "./login.html";
    }
    if (document.getElementById("toAddPropBtn") != null) {
      document.getElementById("toAddPropBtn").href = "./login.html";
    }
    // ==============================================
    if (isAdmin != null) {
      isAdmin.style.display = "none";
    }
  } else {
    if (document.getElementById("main-navbar") != null) {
      // ======= Auth Btns Setup
      document.getElementById("account-box").classList.remove("hidden-now");
      document.getElementById("account-li").classList.remove("hidden-now");
      // -----------------
      document.getElementById("name-in-phone").classList.remove("hidden-now");
      document.getElementById("btn-in-phone").classList.remove("hidden-now");
      // -----------------
      document.getElementById("loginBtn").classList.add("hidden-now");
      // ==================================
      // ================= Pages Setup
      document.getElementById("btnToMyFavPage").href = "./favProps.html";
      document.getElementById("btnToMyPropsPage").href =
        "./userProperties.html";
      document.getElementById("btnToMsgPage1").href = "./message.html";
    }
    if (document.getElementById("btnToMsgPage2") != null) {
      document.getElementById("btnToMsgPage2").href = "./message.html";
    }
    if (document.getElementById("toAddPropBtn") != null) {
      document.getElementById("toAddPropBtn").href = "./addProperty.html";
    }
    // ==============================================
    if (isAdmin != null) {
      if (user.isAdmin == true) {
        isAdmin.style.display = "flex";
      } else {
        isAdmin.style.display = "none";
      }
    }
  }
}

// =============================================
// Logout
function logoutBtnClicked() {
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("logout-modal"),
    {}
  );
  postModal.toggle();
}
// -------------------------------------------------
function confirmlogoutClicked() {
  localStorage.removeItem("Is_My_Token");
  localStorage.removeItem("Is_My_User_Info");
  setupUI();
  showAlert("تم تسجيل الخروج بنجاح");
  setTimeout(() => {
    location = "./index.html";
  }, 500);
  setupUI();
}
// =============================================
// Loader function =============================
function toggleLoader(show = true) {
  if (show) {
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.visibility = "hidden";
  }
}
// Alert function ===================================
function showAlert(alertMsg, status = "success") {
  const alertPlaceholder = document.getElementById("success-alert");

  const alert = (message, type) => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `<div>${message}</div>`,
      `<button id="alert-close-btn" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
      `</div>`,
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  alert(alertMsg, status);
  //  Hide THe Alert
  setTimeout(() => {
    if (document.getElementById("alert-close-btn") != null) {
      document.getElementById("alert-close-btn").click();
    }
  }, 3500);
}
// Get User Info
function getCurrentUser() {
  let user = null;
  const storageuser = localStorage.getItem("Is_My_User_Info");
  if (storageuser !== null) {
    user = JSON.parse(storageuser);
  }
  return user;
}
// For Check If The Number is Valid
function checkPhoneNum(phoneNum) {
  const regex = /^01[0-9]{9}$/;
  const isValid = regex.test(phoneNum);
  return isValid;
}
// =======================================
function toggleBox() {
  document.getElementById("account-box").classList.toggle("visble");
  document.getElementById("account-title").classList.toggle("set-border");
}
// =======================================
function goBackBtn() {
  window.history.back();
}
// =======================================
// User Rating
function getUserRating() {
  if (token == null) {
    return;
  }
  axios
    .get(`${baseUrl}/user/rate`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      const data = response.data.data;
      // ==============================
      if (data[0] == null) {
        userHasRating = false;
      } else {
        userRating = data[0].rating;
        ratingId = data[0].id;
        userHasRating = true;

        // Set Rating In UI
        if (document.getElementById("star1") != null) {
          if (userRating == 1) {
            if (document.getElementById("str1") != null) {
              document.getElementById("str1").checked = true;
            }
            document.getElementById("star1").checked = true;
          } else if (userRating == 2) {
            if (document.getElementById("str2") != null) {
              document.getElementById("str2").checked = true;
            }
            document.getElementById("star2").checked = true;
          } else if (userRating == 3) {
            if (document.getElementById("str3") != null) {
              document.getElementById("str3").checked = true;
            }
            document.getElementById("star3").checked = true;
          } else if (userRating == 4) {
            if (document.getElementById("str4") != null) {
              document.getElementById("str4").checked = true;
            }
            document.getElementById("star4").checked = true;
          } else if (userRating == 5) {
            if (document.getElementById("str5") != null) {
              document.getElementById("str5").checked = true;
            }
            document.getElementById("star5").checked = true;
          }
        }
      }
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
// -------------------------------
function ratingClicked(num) {
  const token = localStorage.getItem("Is_My_Token");
  if (token != null) {
    // To Call The Model From JS Not Html
    let postModal = new bootstrap.Modal(
      document.getElementById("rating-modal"),
      {}
    );
    postModal.toggle();
    document.getElementById("rating-num").innerHTML = `${num}`;
  } else {
    showAlert("يجب عليك تسجيل الدخول لتتمكن من إرسال تقيم", "danger");
  }
}

function confirmRating() {
  if (user != null && token != null) {
    if (userHasRating == false) {
      const ratingNum = +document.getElementById("rating-num").innerHTML;
      const params = {
        rating: ratingNum,
      };
      axios
        .post(`${baseUrl}/user/rate`, params, {
          headers: {
            "x-api-key": apiKey,
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toggleLoader(false);
          // console.log(response);
          // =====================
          showAlert(response.data.message);
        })
        .catch((error) => {
          toggleLoader(false);
          console.log(error);
          showAlert("حدث خطأ ما يرجى المحاولة لاحقا", "danger");
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
    } else if (userHasRating == true) {
      const ratingNum = +document.getElementById("rating-num").innerHTML;
      const params = {
        rating: ratingNum,
      };
      axios
        .put(`${baseUrl}/user/rate/${ratingId}`, params, {
          headers: {
            "x-api-key": apiKey,
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toggleLoader(false);
          // console.log(response);
          // =====================
          showAlert(response.data.message);
        })
        .catch((error) => {
          toggleLoader(false);
          console.log(error);
          showAlert("حدث خطأ ما يرجى المحاولة لاحقا", "danger");
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
    getUserRating();
  }
}
// =========================================================
// =========================================================
function getLinks() {
  axios
    .get(`${baseUrl}/admin/profile-links/all`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      let links = response.data.data;
      // =============================
      // Set Links
      faceId = links[3].id;
      instaId = links[2].id;
      tiktokId = links[1].id;
      youtubeId = links[0].id;
      // ------------
      if (document.getElementById("face-link") != null) {
        // Facebook
        if (links[3].url == "null.com") {
          document.getElementById("face-link").removeAttribute("href");
          document.getElementById("face-link").children[0].style.opacity =
            "0.7";
        } else {
          document.getElementById("face-link").href = links[3].url;
          document.getElementById("face-link").children[0].style.opacity = "1";
        }
        // Instagram
        if (links[2].url == "null.com") {
          document.getElementById("insta-link").removeAttribute("href");
          document.getElementById("insta-link").children[0].style.opacity =
            "0.7";
        } else {
          document.getElementById("insta-link").href = links[2].url;
          document.getElementById("insta-link").children[0].style.opacity = "1";
        }
        // tiktok
        if (links[1].url == "null.com") {
          document.getElementById("tiktok-link").removeAttribute("href");
          document.getElementById("tiktok-link").children[0].style.opacity =
            "0.7";
        } else {
          document.getElementById("tiktok-link").href = links[1].url;
          document.getElementById("tiktok-link").children[0].style.opacity =
            "1";
        }
        // youtube
        if (links[0].url == "null.com") {
          document.getElementById("youtube-link").removeAttribute("href");
          document.getElementById("youtube-link").children[0].style.opacity =
            "0.7";
        } else {
          document.getElementById("youtube-link").href = links[0].url;
          document.getElementById("youtube-link").children[0].style.opacity =
            "1";
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
0;
// =========================================================
// =========================================================
// =========================================================
