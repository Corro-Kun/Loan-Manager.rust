const backend = "http://127.0.0.1:8000"

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

export async function getProfile(){
  const response = await fetch(backend+"/profile",{
    headers:{
      'token': localStorage.getItem("idBosque"),
    },
  });
  return await response.json()
}

export async function postCreateUser(data){
  const response = await fetch(backend+"/newuser",{
    method: "POST",
    body: data,
  });
  return await response.json();
}
