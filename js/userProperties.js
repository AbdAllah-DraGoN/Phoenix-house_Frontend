getUserProperties();
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
    getUserProperties(currentPage);
  }
});

// ===========================================
function getUserProperties(page = 1) {
  toggleLoader();
  axios
    .get(`${baseUrl}/user/property/all?limit=10&page=${page}`, {
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
      let properties = response.data.data[0];

      properties.forEach((el) => {
        if (el.image != null) {
          if (el.image.length != 0) {
            imgUrl = el.image[0].url;
          } else {
            imgUrl = "";
          }
        } else {
          imgUrl = "";
        }
        createProperty(
          el.id,
          el.price,
          el.subject,
          el.area,
          el.rooms_number,
          el.bathrooms_number,
          el.location,
          imgUrl
        );
      });
      if (response.data.data[0].length == 0) {
        document.getElementById("userPropsContainer").innerHTML = `
          <h2 class="noProp">لم تقم بإنشاء أى إعلانات بعد</h2>
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
        
        <i class="fa-solid fa-user btn-ico" style="font-size: 2.5rem;"></i>
        
        <span class="bttn" onclick="updatePropertyClicked('${id}')">تعديل</span>
      </div>
    </div>
  </div>
  `;
  document.getElementById("userPropsContainer").innerHTML += propertyContent;
}

// ------------------
function showPropertyClicked(propId) {
  location = `./property.html?${propId}`;
}
// =========================================
function updatePropertyClicked(propId) {
  location = `./addProperty.html?${propId}`;
}
