//home login page: existing posts, add new, update or delete posts

const removeLoveBtns = document.querySelectorAll(".removeLove");
const removeHateBtns = document.querySelectorAll(".removeHate");
const addLoveForm = document.querySelector("#addLoveForm")
const addHateForm = document.querySelector("#addHateForm")

removeLoveBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
        const idToRemove = e.target.getAttribute("data-id");
        fetch(`/api/users/love/${idToRemove}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")

            }
        })
    })
})
removeHateBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
        const idToRemove = e.target.getAttribute("data-id");
        fetch(`/api/users/hate/${idToRemove}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")

            }
        })
    })
})

addLoveForm.addEventListener("submit",e=>{
    e.preventDefault();
    const addLoveId = document.querySelector("#chosenLoveFlavor").value;
    fetch(`/api/users/love/${addLoveId}`,{
        method:"POST"
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})
addHateForm.addEventListener("submit",e=>{
    e.preventDefault();
    const addHateId = document.querySelector("#chosenHateFlavor").value;
    fetch(`/api/users/hate/${addHateId}`,{
        method:"POST"
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})