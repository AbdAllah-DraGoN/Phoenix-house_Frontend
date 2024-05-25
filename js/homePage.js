getHomeLinks();
//
if (user != null) {
  if (user.isAdmin == true) {
    getUnVerifiedUsersByAdmin();
  }
}

//
//
//
//

function getHomeLinks() {
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
      // ------------

      // Facebook
      if (links[3].url == "null.com") {
        document.getElementById("home-face-link").removeAttribute("href");
        document.getElementById("home-face-link").children[0].style.opacity =
          "0.7";
      } else {
        document.getElementById("home-face-link").href = links[3].url;
        document.getElementById("home-face-link").children[0].style.opacity =
          "1";
      }
      // Instagram
      if (links[2].url == "null.com") {
        document.getElementById("home-insta-link").removeAttribute("href");
        document.getElementById("home-insta-link").children[0].style.opacity =
          "0.7";
      } else {
        document.getElementById("home-insta-link").href = links[2].url;
        document.getElementById("home-insta-link").children[0].style.opacity =
          "1";
      }
      // tiktok
      if (links[1].url == "null.com") {
        document.getElementById("home-tiktok-link").removeAttribute("href");
        document.getElementById("home-tiktok-link").children[0].style.opacity =
          "0.7";
      } else {
        document.getElementById("home-tiktok-link").href = links[1].url;
        document.getElementById("home-tiktok-link").children[0].style.opacity =
          "1";
      }
      // youtube
      if (links[0].url == "null.com") {
        document.getElementById("home-youtube-link").removeAttribute("href");
        document.getElementById("home-youtube-link").children[0].style.opacity =
          "0.7";
      } else {
        document.getElementById("home-youtube-link").href = links[0].url;
        document.getElementById("home-youtube-link").children[0].style.opacity =
          "1";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// waitingCount
function getUnVerifiedUsersByAdmin() {
  const token = localStorage.getItem("Is_My_Token");
  toggleLoader();
  axios
    .get(`${baseUrl}/admin/user/unverified?limit=10&page=1`, {
      headers: {
        "x-api-key": apiKey,
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      toggleLoader(false);
      // console.log(response);
      if (response.data.data[1] > 0) {
        document.getElementById("waitingCount").innerHTML =
          response.data.data[1];
        document.getElementById("waitingCount").style.display = "inline";
      }
    })
    .catch((error) => {
      toggleLoader(false);
      console.log(error);
    });
}
