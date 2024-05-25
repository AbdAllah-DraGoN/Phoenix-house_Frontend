getFavProperties();
// ===========================================
// For Pagination
let currentPage = 1,
  lastPage;
window.addEventListener("scroll", () => {
  let endOfPage =
    window.innerHeight + window.scrollY >=
    document.body.scrollHeight - window.innerHeight;
  //----------------------------------------------------------
  if (endOfPage && currentPage < lastPage) {
    currentPage += 1;
    getFavProperties(currentPage);
  }
});

// ===========================================
function getFavProperties(page = 1, reload = false) {
  toggleLoader();
  axios
    .get(`${baseUrl}/user/favorite/all?limit=10&page=${page}`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      lastPage = Math.ceil(response.data.data[1] / 10);
      //--------------------------
      if (reload == true) {
        document.getElementById("favPropsContainer").innerHTML = "";
      }
      //--------------------------
      let properties = response.data.data[0];

      //
      properties.forEach((el) => {
        //
        if (el.property.image != null) {
          if (el.property.image.length != 0) {
            imgUrl = el.property.image[0].url;
          } else {
            imgUrl = "";
          }
        } else {
          imgUrl = "";
        }
        //
        createProperty(
          el.property.id,
          el.property.price,
          el.property.subject,
          el.property.area,
          el.property.rooms_number,
          el.property.bathrooms_number,
          el.property.location,
          imgUrl
        );
      });
      if (response.data.data[0].length == 0) {
        document.getElementById("favPropsContainer").innerHTML = `
          <h2 class="noProp">لم تقم بإضافة اى إعلانات الى المفضلة بعد</h2>
        `;
      }
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
      showAlert("حدث خطأ، حاول مرة أخرى", "danger");
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
// ===========================
function createProperty(
  id,
  price,
  subject,
  area,
  rooms,
  bathRooms,
  location,
  image
) {
  let propertyContent = `
  <div class="propCard" id="${id}">
    <img src="./public/images/${image}" alt="صورة العقار هتظهر فى خلال لحظات ...." />
    <div class="details">
      <div> 
        <span class="lg">${price} جنية مصري</span>
        <i class="fa-solid fa-dollar-sign"></i>
      </div>

      <div> 
        <span class="lg">${subject}</span>
        <i class="fa-solid fa-pen"></i>
      </div>

      <div>
        <span class="si-sm">${area}m</span>
        <i
          class="fa-solid fa-ruler fa-rotate-by"
          style="--fa-rotate-angle: 315deg"
        ></i>
        <span class="sm">${rooms}</span>
        <i class="fa-solid fa-bed"></i>
        <span class="sm">${bathRooms}</span>
        <i class="fa-solid fa-bath"></i>
      </div>

      <div>
        <span class="lg">${location}</span>
        <i class="fa-solid fa-location-dot"></i>
      </div>

      <div>
        <span class="bttn" onclick="showPropertyClicked('${id}')">عرض</span>
        <div class="hrt-icon">
          <i class="fa-solid fa-heart lg-icon-v" onclick="delFav('${id}')"></i>
        </div>
        <span class="bttn" onclick="msgFromProperty('${id}')">مراسلة</span>
      </div>
    </div>
  </div>
  `;
  document.getElementById("favPropsContainer").innerHTML += propertyContent;
}

// ============================
function showPropertyClicked(propId) {
  location = `./property.html?${propId}`;
}
// ============================
function msgFromProperty(propId) {
  location = `./message.html?${propId}`;
}

//
function delFav(id) {
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
      showAlert("تم حذف العقار من المفضة");
      getFavProperties(1, true);
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
