
let input = document.querySelector('#email') as HTMLInputElement
let posts = document.querySelector('.posts') as HTMLDivElement
let see = document.querySelector('#check') as HTMLButtonElement
let one = document.querySelector('#display') as HTMLParagraphElement

interface Project{
    ProjectsId:string
    name:string,
    description:string, 
    enddate:string, 
    email:string
  }

class Posts{
    static getPosts() {
        return new Posts();
      }
    constructor(){
        if(!this.checkIfLoggedIn()){
            location.href = "index.html";
        }
        

    }

    checkIfLoggedIn(){
        try {
            const token = localStorage.getItem("token")
        
            const user = JSON.parse(localStorage.getItem("user")?? "");

            if (!token || !user) return false;

            return true
            
        } catch (error) {
            return false
            
        }

        
    }

    refreshProjects(){
        try {        
            const user = JSON.parse(localStorage.getItem("user")?? "");
            this.showmyproject(user?.email)
            
        } catch (error) {
            console.log(error);
                        
        }
    }
    showadmin(ProjectsId:string) {
      const prom = new Promise<any>(
        (resolve, reject) => {
          fetch(`http://localhost:5000/project/${ProjectsId}`, {
            method: "PUT",
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
        })
        .catch((err) => {
          throw err;
        });
    }


    showmyproject(email:string) {
        const prom = new Promise<any>(
          (resolve, reject) => {
            fetch(`http://localhost:5000/project/${email}`, {
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
          }
        );
    
        prom
          .then((data) => {
            console.log(data);
            if (data.error) {
              check.innerText = "Invalid details";
              let timer = setTimeout(() => {
              check.innerText = "";
            }, 2000);
            } else {
    
          const alldata = data.map((myproject:Project )=>{
          // display.innerHTML=''
          const maindiv = document.createElement("div");
          maindiv.style.backgroundColor = "#108cf8";
          maindiv.style.height = "300px";     
          maindiv.style.width = "250px";
          maindiv.style.borderRadius = "5%";
          const h2 = document.createElement("h2");
          const h4 = document.createElement("h4");
          const p = document.createElement("p");
          const button = document.createElement('button')
          h2.textContent = ` Title : ${myproject.name}`
          h4.textContent = ` myproject: ${myproject.description}`;
          p.textContent = `Due on: ${myproject.enddate}`;
    
          button.textContent='Complete'
          button.style.margin='5%'
          button.style.backgroundColor='azure'
          button.style.color='black'
          // button.style.borderRadius= '5%'
          button.style.borderRadius='5px'
          button.style.height='30px'
          button.style.width='70px'
    
          maindiv.style.color='white'
          maindiv.style.marginTop='3%'
          h2.style.textAlign = "center";
          h4.style.padding='5%'
          p.style.padding='5%'
    
    
          maindiv.appendChild(h2);
          maindiv.appendChild(h4);
          maindiv.appendChild(p);
          maindiv.appendChild(button)
          posts.appendChild(maindiv);
         
            
              button.addEventListener('click', ()=>{
                // console.log('clicked');
                this.showadmin(myproject.ProjectsId)
              one.innerText = "Project Completed";
              })
              let timer = setTimeout(() => {
              one.innerText = "";
            }, 2000);
            
          })
            }
          })
          .catch((err) => {
            throw err;
          });
      }
}

const all= new Posts

all.refreshProjects()

// see.addEventListener('click', ()=>{
    
//     const check = input.value
//     input.value = ''
//     console.log(check);

//     if(check === ""){
//         alert("Email is required")
//         return
//     }

//     Posts.getPosts().showmyproject(check)
    

// })
           