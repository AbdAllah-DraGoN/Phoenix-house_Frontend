let qyeParams;
qyeParams = window.location.search || "?";
// console.log(qyeParams);
getProperties();
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
    getProperties(currentPage);
  }
});

// ===========================================
function getProperties(page = 1) {
  toggleLoader();
  axios
    .get(`${baseUrl}/user/property/search${qyeParams}limit=10&page=${page}`, {
      headers: {
        "x-api-key": apiKey,
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
        document.getElementById("propertiesContainer").innerHTML = `
        <div style="width: fit-content;margin: 4rem auto;font-size: 2rem;font-weight: 700;">
          لا يوجد عقارات بهذة المواصفات حاليا
        </div>
        `;
      }
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
      showAlert("حدث خطأ، حاول مرة أخرى", "danger");
    });
}
function createProperty(
  id,
  price,
  subject,
  area,
  rooms,
  bathRooms,
  location,
  imageUrl
) {
  let propertyContent = `
  <div class="card" id="${id}">
  <input type="hidden" value="" class="favorite"/>
    <img src="./public/images/${imageUrl}" alt="صورة العقار هتظهر فى خلال لحظات ...." />
    <div class="details">
    <div >
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
      <span class="bttn" onclick="msgFromProperty('${id}')">مراسلة</span>
      </div>
    </div>
  </div>
  `;
  document.getElementById("propertiesContainer").innerHTML += propertyContent;
}

// ---------------------------------------
function showPropertyClicked(propId) {
  location = `./property.html?${propId}`;
}
// ---------------------------------------
function msgFromProperty(propId) {
  if (token == null) {
    showAlert("يجب عليك تسجيل الدخول لتتمكن من إرسال رسالة", "danger");
    return;
  }
  location = `./message.html?${propId}`;
}
// ------------------
// ==============================================
