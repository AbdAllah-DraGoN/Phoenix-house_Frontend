// ==========================================
getusersByAdmin();
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
    getusersByAdmin(currentPage);
  }
});
// ==========================================
function getusersByAdmin(page = 1, reload = false) {
  const token = localStorage.getItem("Is_My_Token");
  toggleLoader();
  axios
    .get(`${baseUrl}/admin/user/all?limit=10&page=${page}`, {
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
      document.getElementById("users-count").innerHTML = response.data.data[1];
      // ================================
      if (reload) {
        document.getElementById("usersContaner").innerHTML = "";
      }
      // ================================
      users = response.data.data[0];
      users.forEach((user) => {
        userCard(user.id, user.role, user.name, user.phone, user.createdAt);
      });

      // showAlert("تم إحضار المستخدمين بنجاح");
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}
function userCard(id, role, name, phone, createAt) {
  let createTime =
    createAt.toString().slice(11, 16) +
    " -- " +
    createAt.toString().slice(0, 10);
  content = `
  <div 
  class="card m-3 p-2" 
  style="width: 22rem;
  background: var(--black-color-1);
  border-radius: 2rem;
  color: #fff;"
  >
  <input type="hidden" value="${id}" id="userId">
    <div class="card-head p-2 d-flex justify-content-between">
      <button
        style="
              border-radius: 1rem;
              padding: 0.5rem 1rem;
              background-color: #eee;
              color: var(--text-second-coler);
              font-weight: 500;
              font-size: 1.5rem;
              "
        onclick="deleteUser('${id}')"
      >
        حذف
      </button>
      <span
        id="msg-user-role"
        class="fs-4"
        style="
        border-radius: 1rem;
        padding: 0.5rem 1rem;
        background-color: #eee;
        color: #001255;
        font-weight: 500;
        font-size: 1.5rem;
        cursor: pointer;
        "
        onclick="changeUserRole('${id}')"
        >
        ${role}
        </span>
    </div>
    <div
      class="card-body"
      style="
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      "
    >
    <h5 class="h3 my-3 py-1">
      ${name}
      <i class="fa-solid fa-user px-2" style="color: #fff;font-size: 2rem"></i>
      </h5>
      <h5 class="h3 my-3 py-1">
      ${phone}
      <i class="fa-solid fa-phone px-2" style="color: #fff;font-size: 2rem"></i>
      </h5>
      <h5 class="my-3" style="font-size: 1rem;">
      ${createTime}
      <i class="fa-solid fa-clock px-2" style="color: #fff;font-size: 1.8rem"></i>
      </h5>
    </div>
  </div>
  `;
  document.getElementById("usersContaner").innerHTML += content;
}
//=====================================================
//  === Open Delete User Modal
function deleteUser(id) {
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("delete-user-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("user-id-input1").value = `${id}`;
}
// ------------------------------------------
//  === Confirm Delete User
function confirmDeleteUser() {
  const token = localStorage.getItem("Is_My_Token");
  const id = document.getElementById("user-id-input1").value;
  toggleLoader();
  axios
    .delete(`${baseUrl}/admin/user/${id}`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      showAlert("تم حذف المستخدم بنجاح");
      getusersByAdmin(1, true);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}
//==========================================
function changeUserRole(id) {
  // To Call The Model From JS Not Html
  let postModal = new bootstrap.Modal(
    document.getElementById("change-user-role-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("user-id-input2").value = `${id}`;
}
//------------------------------------------
function confirmUserRole() {
  const token = localStorage.getItem("Is_My_Token");
  const id = document.getElementById("user-id-input2").value;
  const role = document.getElementById("change-user-role-type").value;
  const params = {
    role: role,
  };
  toggleLoader();
  axios
    .post(`${baseUrl}/admin/user/role/${id}`, params, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      console.log(response);
      showAlert("تم تغيير صلاحيات المستخدم بنجاح");
      getusersByAdmin(1, true);
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
      showAlert("فشلت العملية حاول مرة أخرى", "danger");
    });
}
