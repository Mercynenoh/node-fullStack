"use strict";
// const admin= document.getElementById('admin') as HTMLParagraphElement
//  const namess=localStorage.getItem('username')
//  if(namess){
//    admin.textContent=` Welcome Admin : ${namess}`
//  }
// admin
const projectname = document.getElementById("projectname");
const description = document.getElementById("description");
const enddate = document.getElementById("date");
const clientemail = document.getElementById("email");
const add = document.getElementById("add");
const display = document.querySelector('.display');
class Admin {
    static getProject() {
        return new Admin();
    }
    Constructor() { }
    deleteproject(ProjectsId) {
        const prom = new Promise((resolve, reject) => {
            fetch(`http://localhost:5000/project/${ProjectsId}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            })
                .then((res) => {
                resolve(res.json());
            })
                .catch((err) => {
                reject(err);
            });
        });
        prom
            .then((data) => {
        })
            .catch((err) => {
            throw err;
        });
    }
    addproject(name, description, enddate, email) {
        const prom = new Promise((resolve, reject) => {
            fetch("http://localhost:5000/project/", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    description: description,
                    enddate: enddate,
                    email: email,
                }),
            })
                .then((res) => {
                resolve(res.json());
            })
                .catch((err) => {
                reject(err);
            });
        });
        prom
            .then((data) => {
            console.log(data);
            if (data.error) {
                check.innerText = "Invalid details";
                let timer = setTimeout(() => {
                    check.innerText = "";
                }, 2000);
            }
            else {
                check.innerText = "Successful Inserted!";
                let timer = setTimeout(() => {
                    check.innerText = "";
                }, 2000);
            }
        })
            .catch((err) => {
            throw err;
        });
    }
    showproject() {
        const prom = new Promise((resolve, reject) => {
            fetch("http://localhost:5000/project/get", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "GET",
            })
                .then((res) => {
                resolve(res.json());
            })
                .catch((err) => {
                reject(err);
            });
        });
        prom
            .then((data) => {
            console.log(data);
            if (data.error) {
                check.innerText = "Invalid details";
                let timer = setTimeout(() => {
                    check.innerText = "";
                }, 2000);
            }
            else {
                const alldata = data.map((project) => {
                    // display.innerHTML=''
                    const maindiv = document.createElement("div");
                    maindiv.style.backgroundColor = "#108cf8";
                    maindiv.style.height = "300px";
                    maindiv.style.width = "250px";
                    maindiv.style.borderRadius = "5%";
                    const h2 = document.createElement("h2");
                    const h4 = document.createElement("h4");
                    const p = document.createElement("p");
                    const p2 = document.createElement("p");
                    const button = document.createElement('button');
                    h2.textContent = ` Title : ${project.name}`;
                    h4.textContent = ` Project: ${project.description}`;
                    p.textContent = `Due on: ${project.enddate}`;
                    p2.textContent = ` Assigned to:  ${project.email}`;
                    button.textContent = 'Delete';
                    button.style.margin = '5%';
                    button.style.backgroundColor = 'azure';
                    button.style.color = 'black';
                    button.style.borderRadius = '5px';
                    button.style.height = '30px';
                    button.style.width = '70px';
                    button.addEventListener('click', () => {
                        this.deleteproject(project.ProjectsId);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    });
                    maindiv.style.color = 'white';
                    maindiv.style.marginTop = '3%';
                    h2.style.textAlign = "center";
                    h4.style.padding = '5%';
                    p.style.padding = '5%';
                    p2.style.padding = '5%';
                    maindiv.appendChild(h2);
                    maindiv.appendChild(h4);
                    maindiv.appendChild(p);
                    maindiv.appendChild(p2);
                    maindiv.appendChild(button);
                    display.appendChild(maindiv);
                });
                check.innerText = "Successful Inserted!";
                let timer = setTimeout(() => {
                    check.innerText = "";
                }, 2000);
            }
        })
            .catch((err) => {
            throw err;
        });
    }
    showusers() {
        const prom = new Promise((resolve, reject) => {
            fetch("http://localhost:5000/user/all", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "GET",
            })
                .then((res) => {
                resolve(res.json());
            })
                .catch((err) => {
                reject(err);
            });
        });
        prom
            .then((data) => {
            console.log(data);
            const allusers = data.map((user) => {
                const html = `
          <option value=${user.email}>${user.email}</option>
          `;
                clientemail.insertAdjacentHTML('beforeend', html);
            });
        })
            .catch((err) => {
            throw err;
        });
    }
}
let project = new Admin;
project.showproject();
project.showusers();
add.addEventListener("click", (e) => {
    e.preventDefault();
    const name = projectname.value;
    const desc = description.value;
    const end = enddate.value;
    const mail = clientemail.value;
    projectname.value = "";
    description.value = "";
    enddate.value = "";
    clientemail.value = "";
    if (name === "" || desc == "" || end == "" || mail == "") {
        projectname.style.border = "2px solid red";
        description.style.border = "2px solid red";
        enddate.style.border = "2px solid red";
        clientemail.style.border = "2px solid red";
        check.innerText = "Cannot add empty fields";
        check.style.color = 'red';
        let timer = setTimeout(() => {
            projectname.style.border = "2px solid black";
            description.style.border = "2px solid black";
            enddate.style.border = "2px solid black";
            clientemail.style.border = "2px solid black";
            // check.innerText = "";
        }, 2000);
    }
    else {
        Admin.getProject().addproject(name, desc, end, mail);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        // project.showproject()
    }
});
