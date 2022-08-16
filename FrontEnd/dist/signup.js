"use strict";
// const username = document.getElementById("username") as HTMLInputElement;
// const email = document.getElementById("email") as HTMLInputElement;
// const password = document.getElementById("password") as HTMLInputElement;
// const register = document.getElementById("register") as HTMLButtonElement;
// class Users {
//     static getUser() {
//         return new Users();
//     }
//     constructor() { }
//     register(username: string, email:string,  password: string) {
//         const prom = new Promise<{ error?: string, message?: string }>((resolve, reject) => {
//             fetch('http://localhost:5000/user/signup', {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method:"POST",
//                 body: JSON.stringify({
//                     "username":username,
//                     "email": email,
//                     "password": password
//                 })
//             }).then(res => {
//                 resolve(res.json())
//             }).catch(err => {
//                 reject(err)
//             })
//         })
//         prom.then(data=>console.log(data)).catch(err=>console.log(err))
//     }
// }
// register.addEventListener('click', () => {
//     console.log('clicked')
//     const nameinput = username.value;
//     const emailinput = email.value;
//     const passwordInput = password.value;
//     if (nameinput == '' || emailinput == '' || passwordInput == '') {
//         username.style.border='red'
//         email.style.border='red'
//         password.style.border='red'
//     } else {
//         Users.getUser().register(emailinput, nameinput,passwordInput)
//     }
// })
