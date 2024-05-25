let details;
checkDetails();

//
//
function sendBtnClicked() {
  let msgContent = document.getElementById("msgContent").value;
  if (msgContent == "") {
    showAlert("لا يمكن إرسال رسالة فارغة", "danger");
    return;
  }
  const params = {
    content: msgContent,
  };
  if (details != "") {
    params.details = `${details}`;
  }
  const token = localStorage.getItem("Is_My_Token");

  if (token == null) {
    showAlert("يجب عليك تسجيل الدخول لتتمكن من إرسال رسالة", "danger");
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
      showAlert(response.data.message);
      // reset inputs
      document.getElementById("msgContent").value = "";
      checkDetails();
    })
    .catch((error) => {
      toggleLoader(false);
      showAlert(error.response.data.message, "danger");
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
function checkDetails() {
  if (location.search != "") {
    details = location.search.slice(1);
    document.getElementById("overBox").style.display = "inline";
  } else {
    details = "";
    document.getElementById("overBox").style.display = "none";
  }
}
