import emailjs from "emailjs-com";
import React, {useState, useEffect} from 'react';

const Email = (props) =>{
const content={
    email:'',
    message:'',
    tname:'',

}

const [mail,setmail]= useState(content);

/*function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }*/
    function email () {
        console.log('correo')
        mail.email=props.email
        mail.message=props.message
        mail.tname=props.tname


        if (props.tipo.localCompare('new')===0){
            emailjs.sendForm('gmail','App_new',mail,'user_rE6XEi4rHbxlMHTN0TcUp')
        }else{
            emailjs.sendForm('gmail','App_rec',mail,'user_rE6XEi4rHbxlMHTN0TcUp')
        }
        console.log(mail);
        props.done(false);
        setmail(...content)        
        
    }

    useEffect(()=>{
        email()
    },[mail])

    return(email())

}
export default Email