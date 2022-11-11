//home login page: existing posts, add new, update or delete posts

const removePostBtns = document.querySelectorAll(".removePost");
const addPost = document.querySelector("#addPost")
const updatePost = document.querySelector("#updatePost")

removePostBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
        const idToRemove = e.target.getAttribute("data-id");
        fetch(`/api/users/post/${idToRemove}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("fail to remove")

            }
        })
    })
})

addPost.addEventListener("submit",e=>{
    e.preventDefault();
    const addPostID = document.querySelector("#PostID").value;
    fetch(`/api/users/post/${addPostID}`,{
        method:"POST"
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("fail to add")
        }
    })
})
updatePost.addEventListener("submit",e=>{
    e.preventDefault();
    const updatePostId = document.querySelector("#PostID").value;
    fetch(`/api/users/post/${updatePostId}`,{
        method:"POST"
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("fail to update")
        }
    })
})