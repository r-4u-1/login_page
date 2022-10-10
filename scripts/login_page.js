const navNewUserBtn = document.getElementById("nav_new_user");

const newUserBtn = document.getElementById("new_user");
const navbarElement = document.querySelector("nav");
var navOptionElement = document.querySelector(".navbar_options");
const loginBtn = document.getElementById("login_btn");
const containerFormElement = document.querySelector(".container");
const formElement = document.getElementById("my_form");
// const inputUsernameElement= document.getElementById("username");
// const inputPasswordElement= document.getElementById("password");
const validUserNameChars =
  "qwertyuiopåasdfghjklöäzxcvbnmQWERTYUIOPÅASDFGHJKLÖÄZXCVBNM";
const validPasswordChars =
  "qwertyuiopåasdfghjklöäzxcvbnmQWERTYUIOPÅASDFGHJKLÖÄZXCVBNM1234567890";

const newUserForm = `<h1>New user</h1><div id="my_form">
    <input type="text" placeholder="Choose username" id="c_username" class="field" pattern="[A-Z,a-z,0-9]{10}">
    <input type="password" placeholder="Choose password" id="c_password" class="field" pattern="[A-Z,a-z,0-9]{10}">
    <input type="submit" value="Create user" id="createBtn" class="btn">
    </div> `;

const loginForm = `
    <h1>Login</h1>
    <div id="my_form">
        <input type="text" placeholder="Username" class="field" id="username" pattern="[A-Z,a-z,0-9]{10}">
        <input type="password" placeholder="Password" class="field" id="password" pattern="[A-Z,a-z,0-9]{10}">
        <button class="btn" id="login_btn">Login</button>
    </div>
    <button class="btn" id="new_user">New user</button>
    `;
const navLogoutOption = `<div class="navbar_options">
        <div id="logout">Logout</div>
    </div>`;

const navLoginOption = `<div class="navbar_options">
        <div id="login">Login</div>
    </div>`;

const navCreateUserOption = `
<div class="navbar_options">
    <div id="nav_new_user">Create a new user</div>
</div>
`;

const fredrik = {
  username: "fredrik",
  password: "12345",
};
const benicio = {
  username: "benicio",
  password: "456",
};
const arnold = {
  username: "arnold",
  password: "789",
};
const users = [fredrik, benicio, arnold];

let logOutBtn;
let currentUser = window.localStorage.getItem("current_user");

for (const user of users) {
  window.localStorage.setItem(user.username, JSON.stringify(user));
}

if (currentUser) {
  //If we have a current in memory then we display the logged in view for the user
  let cu = JSON.parse(currentUser);
  changeNavbar(navLogoutOption);
  changeLoginModalToLoggedInUser(cu, containerFormElement);

  logOutBtn = document.getElementById("logout");
  logOutBtn.addEventListener("click", logOutUser);
}

function changeModal(newOption, modal = containerFormElement) {
  modal.innerHTML = newOption;
}

function changeLoginModalToLoggedInUser(
  currentUser,
  loginM = containerFormElement
) {
  /**
   * Changes the login modal to the welcome user view
   */

  const loggedInUserH1 = `<h1>Welcome ${currentUser.username}</h1>`;
  loginM.innerHTML = loggedInUserH1;
}

function changeNavbar(newOption = navLogoutOption, nav = navbarElement) {
  /**
   * Changes the navbar to different views/options
   */

  nav.innerHTML = newOption;
}
// pointer="", loginF=loginForm, container=containerFormElement, navLoginOpt=navCreateUserOption
function logOutUser() {
  /**
   * Logs out user by removing them from local storage memory and displaying the login modal
   */
  window.localStorage.removeItem("current_user");
  changeModalToLoginView();
}

function changeModalToLoginView(
  pointer = "",
  newNavOption = navCreateUserOption,
  nav = navbarElement,
  currentNavOption = navOptionElement
) {
  changeNavbar(newNavOption, nav);
  changeModal(loginForm, containerFormElement);
  const newUserBtn2 = document.getElementById("new_user");
  const navNewUserBtn2 = document.getElementById("nav_new_user");
  const loginBtn2 = document.getElementById("login_btn");
  newUserBtn2.addEventListener("click", changeModalToNewUser);
  navNewUserBtn2.addEventListener("click", changeModalToNewUser);
  loginBtn2.addEventListener("click", login);
}

function createUser() {
  const cuserNameE = document.getElementById("c_username");
  const cPasswordE = document.getElementById("c_password");
  const cUsername = cuserNameE.value;
  const cPassword = cPasswordE.value;
  let saveUsername;
  let savePassword;
//   let regexPattern = /^\w{0,10}+$/;
//   let regexPattern = /^[A-Z,a-z,0-9]{1,10}/
  let regexPattern = /^[a-z,A-Z,0-9]{1,10}$/
  let usernameSave = regexPattern.test(cUsername);
  let passwordSave = regexPattern.test(cPassword);

  let nameErrorMessage = "Yoooooo"
  let passerrorMessage = "Noooooo"
  let errorMessageNameSpan = document.createElement("p");
  let errorMessagePassSpan = document.createElement("p");
  errorMessageNameSpan.setAttribute("class", "error");
  errorMessagePassSpan.setAttribute("class", "error");
  
  errorMessageNameSpan.textContent = nameErrorMessage;
  errorMessagePassSpan.textContent = passerrorMessage;


  if (!usernameSave) cuserNameE.after(errorMessageNameSpan);
  if (!passwordSave) cPassword.after(errorMessagePassSpan);


  for (const char of cUsername) {
    if (validUserNameChars.includes(char)) {
      saveUsername = true;
      continue;
    } else {
      saveUsername = false;
      alert(
        `username: ${cUsername} is not valid. Only the following characters are allowed: ${validUserNameChars}`
      );
      break;
    }
  }
  for (const char of cPassword) {
    if (validPasswordChars.includes(char)) {
      savePassword = true;
      continue;
    } else {
      savePassword = false;
      alert(
        `password: ${cPassword} is not valid. Only the following characters are allowed: ${validPasswordChars}`
      );
      break;
    }
  }
  if (saveUsername && savePassword) {
    const newUser = {
      username: cUsername,
      password: cPassword,
    };
    window.localStorage.setItem(newUser.username, JSON.stringify(newUser));
    window.localStorage.setItem("current_user", JSON.stringify(newUser));
    const newUserForm = document.getElementById("my_form");
    changeLoginModalToLoggedInUser(newUser, containerFormElement, newUserForm);
    changeNavbar();
    logOutBtn = document.getElementById("log_out");
    logOutBtn.addEventListener("click", logOutUser);
  }
}

function login() {
  const inputUsernameElement = document.getElementById("username");
  const inputPasswordElement = document.getElementById("password");
  let inputUsername = inputUsernameElement.value;
  let inputPassword = inputPasswordElement.value;
  console.log(`the inputUsername is: ${inputUsername}`);

  let foundUser = window.localStorage.getItem(inputUsername);
  if (!foundUser) {
    inputUsernameElement.style.border = "thick solid #f70a02ce";
    alert(`username: ${inputUsername} is not found.`);
    return;
  }
  let userObject = JSON.parse(foundUser);
  let correctPass = userObject.password == inputPassword;

  if (!correctPass) {
    inputPasswordElement.style.border = "thick solid #f70a02ce";
    alert(`password: ${inputPassword} is incorrect.`);
    return;
  }

  window.localStorage.setItem("current_user", JSON.stringify(userObject));

  changeLoginModalToLoggedInUser(userObject);
  changeNavbar();

  logOutBtn = document.getElementById("logout");
  logOutBtn.addEventListener("click", logOutUser);
}

function changeModalToNewUser() {
  let navbar = document.querySelector("nav");
  changeNavbar(navLoginOption, navbar);

  containerFormElement.innerHTML = newUserForm;

  const navLoginBtn = document.getElementById("login");
  navOptionElement = document.querySelector(".navbar_options");
  navLoginBtn.addEventListener("click", changeModalToLoginView);

  const creatBtn = document.getElementById("createBtn");

  creatBtn.addEventListener("click", createUser);
}

loginBtn.addEventListener("click", login);
newUserBtn.addEventListener("click", changeModalToNewUser);
navNewUserBtn.addEventListener("click", changeModalToNewUser);
