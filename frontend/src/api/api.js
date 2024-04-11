const backend = "http://127.0.0.1:8000"

// funcion for login

export async function postLogin(data){
  const response = await fetch(backend+"/login",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }); 
  return await response.json();
}

// function for get profile for user

export async function getProfile(){
  const response = await fetch(backend+"/profile",{
    headers:{
      'token': localStorage.getItem("idBosque"),
    },
  });
  return await response.json()
}

// function for create user in the api

export async function postCreateUser(data){
  const response = await fetch(backend+"/user",{
    method: "POST",
    body: data,
  });
  return await response.json();
}

// function for create item in the api

export async function postCreateItem(data){
  const response = await fetch(backend+"/item",{
    method: "POST",
    body: data,
  });
  return await response.json();
}

// function for create class in the api

export async function postCreateClass(data){
  const response = await fetch(backend+"/class",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

// function for get empty class

export async function getClassEmpty(){
  const response = await fetch(backend+"/class/empty");
  return await response.json();
}

export async function postTeacher(data){
  const response = await fetch(backend+"/teacher",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}


export async function postTeacherWithClass(data){
  const response = await fetch(backend+"/teacher/class",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function postStudent(data){
  const response = await fetch(backend+"/student",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getStudentById(id){
  const response = await fetch(`${backend}/student/${id}`);
  return await response.json();
}

export async function getClassComplet(id){
  const response = await fetch(`${backend}/class/complet/${id}`);
  return await response.json();
}

export async function getItemsNotLend(){
  const response = await fetch(backend+"/item/notlend");
  return await response.json();
}

export async function postLend(data){
  const response = await fetch(backend+"/lend", {
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'token': localStorage.getItem("idBosque"),
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function getHistory(){
  const response = await fetch(backend+"/lend/history");
  return await response.json();
}
