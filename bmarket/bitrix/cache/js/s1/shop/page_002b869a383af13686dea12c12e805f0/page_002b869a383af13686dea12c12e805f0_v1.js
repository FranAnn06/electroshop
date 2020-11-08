
; /* Start:"a:4:{s:4:"full";s:86:"/local/templates/shop/components/bitrix/catalog.element/detail/script.js?1597091650567";s:6:"source";s:72:"/local/templates/shop/components/bitrix/catalog.element/detail/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
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


/* End */
;; /* /local/templates/shop/components/bitrix/catalog.element/detail/script.js?1597091650567*/
