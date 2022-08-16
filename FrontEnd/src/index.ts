const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;                                                                      
const registeruser = document.getElementById("register") as HTMLButtonElement;
const loginemail = document.getElementById("loginemail") as HTMLInputElement;
const loginpassword = document.getElementById("loginpassword") as HTMLInputElement;
const loginuser = document.getElementById("loginbutton") as HTMLButtonElement;
const validate = document.getElementById("validation") as HTMLParagraphElement;
const validater = document.getElementById("validations") as HTMLParagraphElement;
const check = document.getElementById("check") as HTMLParagraphElement;
const signUpButton = document.getElementById("signUp") as HTMLButtonElement;
const signInButton = document.getElementById("signIn") as HTMLButtonElement;
const container = document.getElementById("container") as HTMLButtonElement;


window.onload = function () {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
};

class Users {
  static getUser() {
    return new Users();
  }

  constructor() {}

  register(username: string, email: string, password: string) {
    const prom = new Promise<{ error?: string; message?: string }>(
      (resolve, reject) => {
        fetch("http://localhost:5000/user/signup", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        })
          .then((res) => {
            resolve(res.json());
          })
          .catch((err) => {
            reject(err);
          });
      }
    );

    prom
      .then((data) => {
        console.log(data);
        if (data.error) {
          validate.innerText = "Invalid Credentials";
        } else {
          validate.innerText = "Registration Successful!";
          container.classList.remove("right-panel-active");
          // container.classList.remove("right-panel-active");
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  // redirect() {
  //   const token = localStorage.getItem("token") as string;
  //   new Promise<{ username: string; role: string }>((resolve, reject) => {
  //     fetch("http://localhost:5000/user/check", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         token: token,
  //       },
  //       method: "GET",
  //     })
  //       .then((res) => resolve(res.json()))
  //       .catch((err) => reject(err));
  //   }).then((data) => {
  //     console.log(data);
  //     localStorage.setItem("username", data.username);
  //     if (data.role === "admin") {
  //       location.href = "admin.html";
  //     } else {
  //       location.href = "user.html";
  //     }
  //   });
  // }

  loginUser(email: string, password: string) {
      fetch("http://localhost:5000/user/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          
          data.token ? localStorage.setItem("token", data.token) : "";
          data.user ? localStorage.setItem("user", JSON.stringify(data.user)) : "";
          if (data.message) {
            validater.innerText = "Invalid Credentials";
          } 

          if(data.user){
            if (data.user.role === "admin") {
              location.href = "admin.html";
            } else {
              location.href = "user.html";
            }
          }
        })
        .catch(console.log)
    
  }

  

}

registeruser.addEventListener("click", () => {
  const nameinput = username.value;
  const emailinput = email.value;
  const passwordInput = password.value;
  username.value = "";
  email.value = "";
  password.value = "";

  if (nameinput === "" || emailinput == "" || passwordInput == "") {
    username.style.border = "2px solid red";
    email.style.border = "2px solid red";
    password.style.border = "2px solid red";
    validate.innerText = "Cannot Submit Empty Fields";
    validate.style.color = "Red";
    validate.style.textAlign = "center";
    let timer = setTimeout(() => {
      username.style.border = "none";
      email.style.border = "none";
      password.style.border = "none";
      validate.innerText = "";
      validate.innerText = "";
    }, 2000);
  } else {
    Users.getUser().register(nameinput, emailinput, passwordInput);
    // container.classList.remove("right-panel-active");
  }
});

loginuser.addEventListener("click", (e) => {
  e.preventDefault();
  const emaillog = loginemail.value;
  const passwordlog = loginpassword.value;


  if (emaillog === "" || passwordlog == "") {
    loginemail.style.border = "2px solid red";
    loginpassword.style.border = "2px solid red";
    validater.innerText = "Enter details to login";
    validater .style.color= 'red'
    let timer = setTimeout(() => {
      loginemail.style.border = "none";
      loginpassword.style.border = "none";
      validater.innerText = "";
    }, 2000);
  } else {
    Users.getUser().loginUser(emaillog, passwordlog)
  }
});

