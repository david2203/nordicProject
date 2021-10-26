import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config"
import Groups from "./Groups"
import Brackets from "./Brackets"

function Euro() {
    const initialValues = {
        typeOfView:"",
    } 
    
    const [formValues, setFormValues] = useState(initialValues)
    function handleOnChange(e) {
        setFormValues({...formValues,[e.target.name]: e.target.value})   
        console.log(formValues)
    }

    return (
        <>
             <select 
                name="typeOfView" 
                id="view" 
                value={formValues.view} 
                onChange={handleOnChange}
                sx={{ 
                minWidth: 125,
                minHeight: 5
                }}>
                <option value=""> Chose view </option>
                <option value="GroupView"> Group View </option>
                <option value="EliminationView"> Elimination View </option> 
            </select><br/>
            { formValues.typeOfView === "GroupView" ? ( <Groups/>) : (<></>)}
            { formValues.typeOfView === "EliminationView" ? ( <Brackets/>) : (<></>)}

        </>
    )
}

export default Euro
