const backend = "http://127.0.0.1:8000"

export async function postLogin(data){
  const response = await fetch(backend+"/login",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }); 
  console.log(await response.json());
}

