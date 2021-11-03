import React, { useState, useEffect } from "react";
import Groups from "./Groups";
import Brackets from "./Brackets";
import Groupsinfo from "./Groupsinfo";
import { Parallax } from "react-parallax";
function Euro() {
  const initialValues = {
    typeOfView: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  function handleOnChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
  useEffect(() => {}, [formValues]);

  const image1 =
    "https://images.unsplash.com/photo-1531819318554-84abdf082937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2246&q=80";

  return (
    <>
      <select
        name="typeOfView"
        id="view"
        value={formValues.view}
        onChange={handleOnChange}
        sx={{
          minWidth: 125,
          minHeight: 5,
        }}
      >
        <option value=""> Chose view </option>
        <option value="GroupView"> Group View </option>
        <option value="EliminationView"> Elimination View </option>
      </select>
      <br />
      {formValues.typeOfView === "" ? "Insert something cool " : <></>}
      {formValues.typeOfView === "GroupView" ? (
        <>
          <Parallax bgImage={image1} strength={1500}>
            <div cstyle={{ height: "auto" }}></div>
            <Groupsinfo /> <Groups />
          </Parallax>
        </>
      ) : (
        <></>
      )}
      {formValues.typeOfView === "EliminationView" ? <Brackets /> : <></>}
    </>
  );
}

export default Euro;
