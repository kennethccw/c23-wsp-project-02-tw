console.log("hi");
import { searchBar } from "./forImport.js";
window.onload = async () => {
  login();
  // logout();
  // googleLogin();
  searchBar();
};

function login() {
  const oldURL = document.referrer;
  console.log(oldURL, "<= this is the previous page URL");
  // console.log(idOfProduct, "bitch");

  const signInForm = document.querySelector("#signinform");
  console.log(signInForm);
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formBody = {
      email: form.email.value,
      password: form.password.value,
      url: oldURL,
    };
    console.log(formBody);
    const resp = await fetch("/login", {
      //send request to app.ts to trigger the route handler
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formBody),
    });
    // let data = resp.json();
    if (resp.status === 200) {
      // const newNavBar = document.querySelector(".dropdown-container");
      // newNavBar.removeAttribute("hidden");

      window.location = oldURL;
      // window.location = "/";
    } else {
      const data = await resp.json();
      alert(`${data.message}`);
    }
  });
}

// function logout() {
//   const logoutButton = document.querySelector(".logoutbutton");
//   logoutButton.addEventListener("click", async (e) => {
//     e.preventDefault();
//     const resp = await fetch("/logout", { method: "GET" });
//     if (resp.status === 200) {
//       alert("You signed out!!");
//       window.location = "/";
//     }
//   });
// }
function googleLogin() {
  const googleLoginButton = document.querySelector(".google-login");
  googleLoginButton.addEventListener("click", async (e) => {
    // e.preventDefault();
    const resp = await fetch("/login/google", { method: "GET" });
    if (resp.status === 200) {
      alert("signed in with google");
      window.location = "/";
    } else {
      alert("please register first");
      window.location = "/register.html";
    }
  });
}
