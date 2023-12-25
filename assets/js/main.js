const form = document.querySelector(".main__form"),
  errorMessage = document.querySelector("#error"),
  formBtn = document.querySelector(".form__btn"),
  mainModeSpan = document.querySelector(".main__mode > span"),
  mainDarkIcon = document.querySelector(".fa-moon"),
  mainLightIcon = document.querySelector("#sun"),
  themeSwitcher = document.querySelector(".main__mode"),
  root = document.querySelector(":root");
  
  
let githubProfilImage = document.querySelector(".main__profil > img"),
user__title = document.querySelector(".user__title"),
user__name = document.querySelector(".user__name"),
username__data_subtitle = document.querySelector(".username__data-subtitle"),
main__subtitle = document.querySelector(".main__subtitle"),
username__key = document.querySelectorAll(".username__key"),
user__subtitle = document.querySelectorAll(".user__subtitle"),
login = document.querySelector(".login");


if(localStorage.getItem("lastUsername")){
  getUserData(localStorage.getItem("lastUsername"))
}

let themes = localStorage.getItem("theme");
if (themes === "dark") {
  localStorage.setItem("theme", "dark");
  root.style.setProperty("--white", "#1E2A47");
  root.style.setProperty("--light-color", "#141D2F");
  root.style.setProperty("--black-color", "#FFFFFF");
  root.style.setProperty("--light-gray", "#fff");
  root.style.setProperty("--golder-gray", "#fff");
  root.style.setProperty("--blue-color", "rgb(0, 121, 255)");
  mainModeSpan.textContent = "Light";
}
function getUserData(username) {
  fetch("https://api.github.com/users/"+ username)
    .then((res) => res.json())
    .then((data) => {

      githubProfilImage.src = data.avatar_url;
      user__title.textContent = data.name;
      user__name.textContent = data.login;
      username__data_subtitle.textContent = data.created_at;
      main__subtitle.textContent = data.bio;
  
      username__key[0].textContent = data.public_repos;
      username__key[1].textContent = data.followers;
      username__key[2].textContent = data.following;

      user__subtitle[0].textContent = data.location;
      user__subtitle[1].textContent = data.twitter_username;
      user__subtitle[2].textContent = data.html_url;

      login.textContent = data.login;

      if (data.bio === "" || data.bio == null) {
        main__subtitle.textContent = "This profile has no bio";
      }
      if (data.twitter_username === "" || data.twitter_username == null) {
        user__subtitle[1].textContent = "Not Available";
      }

      if (data.location === "" || data.location == null) {
        user__subtitle[0].textContent = "Cannot find location";
      }

      if (!data.name) {
        githubProfilImage.src = "/assets/images/Bitmap.png";
      }
    });
}

formBtn.addEventListener("click", (e) => {
  if (form.search.value.trim() === "" || form.search.value == null) {
    e.preventDefault();
    errorMessage.textContent = "No results";
  } else {
    getUserData(form.search.value);
    errorMessage.textContent = "";
    localStorage.setItem("lastUsername",form.search.value);
  }
});

themeSwitcher.addEventListener("click", () => {
  themeSwitcher.classList.toggle("active");
  if (themeSwitcher.classList.contains("active")) {
    localStorage.setItem("theme", "dark");
    root.style.setProperty("--white", "#1E2A47");
    root.style.setProperty("--light-color", "#141D2F");
    root.style.setProperty("--black-color", "#FFFFFF");
    root.style.setProperty("--light-gray", "#fff");
    root.style.setProperty("--golder-gray", "#fff");
    root.style.setProperty("--blue-color", "rgb(0, 121, 255)");
    mainModeSpan.textContent = "Light";
    mainLightIcon.style.display = "block";
    mainDarkIcon.classList.add("remove");
  } else {
    mainDarkIcon.classList.remove("remove");
    mainLightIcon.style.display = "none";
    localStorage.removeItem("theme");
    mainModeSpan.textContent = "Dark";
    root.style.setProperty("--white", "rgb(254, 254, 254)");
    root.style.setProperty("--light-color", "rgb(246, 248, 255)");
    root.style.setProperty("--black-color", "rgb(43, 52, 66)");
    root.style.setProperty("--light-gray", "rgb(75, 106, 155)");
    root.style.setProperty("--golder-gray", "rgb(105, 124, 154)");
    root.style.setProperty("--blue-color", "rgb(0, 121, 255)");
  }
});


