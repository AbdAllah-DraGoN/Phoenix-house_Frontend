// ==========================================
getMsgByAdmin();
// ==========================================
let currentPage = 1,
  lastPage;
window.addEventListener("scroll", () => {
  let endOfPage =
    window.innerHeight + window.scrollY >=
    document.body.scrollHeight - window.innerHeight;
  //----------------------------------------------------------
  if (endOfPage && currentPage < lastPage) {
    currentPage += 1;
    getMsgByAdmin(currentPage);
  }
});
// ==========================================
function getMsgByAdmin(page = 1) {
  const token = localStorage.getItem("Is_My_Token");
  toggleLoader();
  axios
    .get(`${baseUrl}/admin/message/all?limit=10&page=${page}`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      lastPage = Math.ceil(response.data.data[1] / 10);
      // ================================
      messages = response.data.data[0];
      messages.forEach((msg) => {
        msgCard(
          msg.user.name,
          msg.user.phone,
          msg.user.role,
          msg.content,
          msg.details,
          msg.createdAt
        );
      });
      if (document.getElementById("msgContaner").innerHTML == "") {
        document.getElementById(
          "msgContaner"
        ).innerHTML = `<span style="font-size: 4rem; margin: 3rem;">لا يوجد رسائل</span>`;
      } else {
        // showAlert("تم إحضار الرسائل بنجاح");
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
// ==========================================
function msgCard(name, phone, role, content, details, createAt) {
  let orderContent = "";
  if (details == null || details == "") {
    orderContent = "";
  } else {
    orderContent = `
    <div style="width: 100%;padding: 0.5rem;text-align: center;">
      <button
      style="
        border-radius: 1rem;
        padding: 0.5rem 1rem;
        background-color: #6f000b;
        color: #fff;
        font-weight: 800;
      "
      onclick="showOrder('${details}')"
    >
      عرض الطلب المرفق
    </button>
      </div>
    `;
  }
  let createTime =
    createAt.toString().slice(0, 10) +
    " -- " +
    createAt.toString().slice(11, 16);
  cardContent = `
  <div class="card m-3" style="width: 90%;background-color: #ccc;border-radius: 2rem;">
    <div class="card-body" style="padding: 0;">
      <div
        class="p-2 text-white d-flex flex-column justify-content-around"
        style="background: var(--black-color-1);border-radius: 2rem;"
      >
        <div class="d-flex justify-content-around my-2">
          <h6>
            Phone:<span id="msg-user-phone" class="fs-4">
            ${phone}
            </span>
          </h6>
          
          <h6>
            Name:
            <span id="msg-user-name" class="fs-4 ">
              ${name}
            </span>
          </h6>
        </div>
        <div class="d-flex justify-content-around my-2">
          <h6 id="msg-update-time">
            Created At:<span id="msg-user-role">
            ${createTime}</span>
          </h6>
          
          <h6>
            Role:
            <span id="msg-user-role" class="fs-4 ">${role}</span>
          </h6>
        </div>
      </div>
      <p
        id="msg-content"
        class="card-text p-3 fs-3"
        style="text-align: center; margin: 0;font-weight: 600;"
      >
      ${content}
      </p>
      ${orderContent}
      </div>
  </div>
  `;

  document.getElementById("msgContaner").innerHTML += cardContent;
}
// ==========================================
function showOrder(orderId) {
  if (orderId.slice(0, 5) == "serv-") {
    window.open(`../order_services.html?${orderId}`, "_blank");
  } else {
    window.open(`../property.html?${orderId}`, "_blank");
  }
}
