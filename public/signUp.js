const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value,
    }
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           alert("success!")
           return res.json()
        } else {
            alert("fail to load")
            location.reload();
        }
    }).then(data=>{
        location.href = `/user/${data.id}`
    })
})