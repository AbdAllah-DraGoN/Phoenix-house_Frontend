// const submitBtn = document.getElementById("register-submit-btn");
// ============
function registerBtnClicked() {
  const registerNameInput = document.getElementById(
    "register-name-input"
  ).value;
  const registerNumberInput = document.getElementById(
    "register-number-input"
  ).value;
  const registerPassInput = document.getElementById(
    "register-pass-input"
  ).value;
  const registerConfirmPassInput = document.getElementById(
    "register-confirm-pass-input"
  ).value;
  // Validation
  if (registerNameInput == "") {
    showAlert("الإسم مطلوب", "danger");
    return;
  }
  if (checkPhoneNum(registerNumberInput) == false) {
    showAlert("رقم هاتف غير صحيح", "danger");
    document.getElementById("register-number-input").value = "";
    return;
  }
  if (registerPassInput == "") {
    showAlert("كلمة المرور مطلوبة", "danger");
    return;
  }
  if (registerPassInput !== registerConfirmPassInput) {
    showAlert("كلمة المرور وتأكيد كلمة المورو غير متطابقان", "danger");
    return;
  }
  const params = {
    name: registerNameInput,
    phone: registerNumberInput,
    password: registerPassInput,
    confirmPassword: registerConfirmPassInput,
  };
  toggleLoader(true);
  // Start Request
  axios
    .post(`${baseUrl}/auth/register`, params, {
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      setupUI();
      showAlert(response.data.message);
      toggleLoader();
      setTimeout(() => {
        toggleLoader(false);
        location = "./userWait.html";
      }, 1500);
    })
    .catch((error) => {
      toggleLoader(false);
      showAlert(error.response.data.message, "danger");
      if (error.response.data.error !== undefined) {
        showAlert(error.response.data.error[0].message, "danger");
      }
      console.log(error);
    });
}
