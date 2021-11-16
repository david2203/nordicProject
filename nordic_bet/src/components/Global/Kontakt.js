import React, {useState, useEffect} from 'react'

function Hjälp() {
    const userId = localStorage.getItem("user_id")
    const username = localStorage.getItem("username")
    const [response, setResponse] = useState("")
    const initialValues = {
        user:userId,
        username:username,
        message:""
    }
    
    const [formValues, setFormValues] = useState(initialValues)
    function handleOnChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        
        
    }
    function sendMessage() {
        console.log(formValues.message, "From user", formValues.user, formValues.username)
        setResponse("Tack för ditt medelande. Vi kommer att höre av oss så snart som möjligt!")
    }
    return (
        <div style={{ height: "auto" }} className="min-vh-100 bg-dark">

    <br/>
<div className="header bg-light w-75 border mx-auto mt-3" style={{opacity: '70%'}}> <h2 className="mt-5"><u>  Medelande: </u></h2> 
 <textarea onChange={handleOnChange} type="text" name="message" cols="40" rows="5" className="m-5" ></textarea><br/>

 {response === "" ? 
 <button className="m-5" onClick={sendMessage} >Skicka </button> :
 <div className="m-5">{response}</div>
 }
 

</div>
</div>
    )
}

export default Hjälp
