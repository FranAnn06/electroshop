const name=document.getElementById('name');
const email=document.getElementById('email');
const comment=document.getElementById('comment');
const errorElement=document.getElementById('error')
comment.addEventListener('submit',(e)=>{
    let messages=[]
    if(email.value==='' || email.value==null){
        messages.push('email is required')
    }
    if(messages.length>0){
        e.preventDefault();
        errorElement.InnerText=messages.join(', ')
    }
    if(name.value==='' || name.value==null){
        name.value="NoName";
    }


})

