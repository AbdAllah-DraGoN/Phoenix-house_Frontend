// =======================================

function loginBtnClicked() {
  const loginNumberInput = document.getElementById("login-number-input").value;
  const loginPassInput = document.getElementById("login-pass-input").value;
  // Validation
  if (checkPhoneNum(loginNumberInput) == false) {
    showAlert("رقم هاتف غير صحيح", "danger");
    document.getElementById("login-number-input").value = "";
    return;
  }
  if (loginPassInput == "" || loginPassInput.length < 8) {
    showAlert("كلمة المرور مطلوبة", "danger");
    return;
  }
  const params = {
    phone: loginNumberInput,
    password: loginPassInput,
  };
  toggleLoader(true);
  // Start Request
  axios
    .post(`${baseUrl}/auth/login`, params, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      localStorage.setItem("Is_My_Token", response.data.data[0].token);
      localStorage.setItem(
        "Is_My_User_Info",
        JSON.stringify(response.data.data[0].user)
      );
      // ----------------
      setupUI();
      showAlert(response.data.message);
      // ----------------
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
      if (error.response.data.error !== undefined) {
        showAlert(error.response.data.error[0].message, "danger");
      }
    });
}
