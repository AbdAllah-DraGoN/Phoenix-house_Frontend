let services = Array.from(document.getElementsByClassName("serv"));
resetInputs();
// ===============================
// Check Query Params
if (location.search != "") {
  const text = location.search.slice(1);
  const parts = splitText(text);
  setChickedInputs(parts);
}
// ===============================

function resetInputs() {
  services.forEach((el) => {
    el.children[0].children[0].checked = false;
  });
}
// ===============================

function sendChickedInputs() {
  if (token == null || user == null) {
    showAlert("يجب عليك تسجيل الدخول لتتمكن من طلب خدمة", "danger");
    return;
  }
  let checkedInputs = "";
  services.forEach((el) => {
    if (el.children[0].children[0].checked == true) {
      checkedInputs += el.children[0].children[0].id;
    }
  });
  resetInputs();
  location = `./message.html?${checkedInputs}`;
}
// ===============================

function setChickedInputs(parts) {
  parts.forEach((el) => {
    document.getElementById(el).checked = true;
  });
}
// ===============================
// For SLice The Services Id
function splitText(text) {
  const parts = [];
  for (let i = 0; i < text.length; i += 7) {
    parts.push(text.slice(i, i + 7));
  }
  return parts;
}
