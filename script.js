document.body.innerHTML = `<section class="top"></section>
                         <section class="container"></section>`;

document.querySelector(
  ".top"
).innerHTML = `<input placeholder="Enter your name" class="name"></input>
<input placeholder="Your profile url" class="url"></input>
<button class="add" onclick="addUser()">AddUser</button>`;

async function userdata() {
  let getdata = await fetch(
    "https://6166c50413aa1d00170a6723.mockapi.io/users",
    { method: "GET" }
  );
  let data = await getdata.json();
  // console.log(data);
  let append = document.querySelector(".container");
  append.innerHTML = " ";

  data.forEach((users) => {
    append.innerHTML += ` 
                            <div class="content">
                          

                           <img src=${users.avatar} class="avatar">
                           <div>
                           <p class="name"> ${users.name}</p> 

                           <button class="edit" onclick="editUser(${users.id})">Edit</button>
                           <button class="delete" onclick="deleteUser(${users.id})">Delete</button>

                           <div class="editbox num-${users.id}"> 
                           <input placeholder="Enter your name" value="${users.name}" class="editname-${users.id}"></input>
                           <input placeholder="Your profile url"  value="${users.avatar}"class="editurl-${users.id}"></input><br>
                           <button class="save" onclick="saveUser(${users.id})">Savedata</button>
                           </div>
                          
                            </div>
                           </div>
                                `;
  });
}
userdata();
// JS

// Delete Data
async function deleteUser(id) {
  console.log(id);
  let datadelete = await fetch(
    "https://6166c50413aa1d00170a6723.mockapi.io/users/" + id,
    { method: "DELETE" }
  );
  let afterdelete = await datadelete.json();
  console.log(afterdelete);
  userdata();
}

// ADD Data
async function addUser() {
  let username = document.querySelector(".name").value;

  let useravatar = document.querySelector(".url").value;
  let adddata = await fetch(
    "https://6166c50413aa1d00170a6723.mockapi.io/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, avatar: useravatar }),
    }
  );
  console.log(adddata);
  userdata();
}

// Edit

function editUser(usersid) {
  let edit = document.querySelector(`.num-${usersid}`);

  edit.style.display = edit.style.display == "block" ? "none" : "block";
  console.log(edit.style.display);
}

// After Edit-Save
async function saveUser(usersid) {
  let editname = document.querySelector(`.editname-${usersid}`).value;
  let editurl = document.querySelector(`.editurl-${usersid}`).value;

  console.log(editname, editurl);

  let editdata = await fetch(
    "https://6166c50413aa1d00170a6723.mockapi.io/users/" + usersid,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editname, avatar: editurl }),
    }
  );

  userdata();
}
