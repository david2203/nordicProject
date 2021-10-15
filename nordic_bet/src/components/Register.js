import React, {useState} from "react";
import axios from "axios";
import server from "./config";

import {
    useHistory,
    Link
  } from "react-router-dom";

  
  function Register() {

    const initialValue = {
        username: "",
        email: "",
        password: ""
    };

    const [registerValues, setRegisterValues] = useState(initialValue);
    const [loggedIn] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();
    const instance = axios.create({baseURL: server})

    function handleOnChange(e) {
        setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
      }

    function handleOnSubmit(e) {
        e.preventDefault();
          instance.post(`auth/local/register`, {
            username: registerValues.username,
            email: registerValues.email,
            password: registerValues.password,
          })
          .then( (e)=> { if(e.data.user) history.push("/login")
          
          })
          .catch((err)=> {setError(err.response.data.message[0].messages[0].message)})
      }
      



  return (
    <>
                <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleOnSubmit}
              method="POST"
              className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
            >
              <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                Register
              </div>
              <div className="text-red-700">{error}</div>
              <div className="mb-4"><br/>
                <label
                  className="block text-gray-700 text-sm font-normal mb-2"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  v-model="form.username"
                  type="username"
                  required
                  placeholder="Username"
                  value={registerValues.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-normal mb-2"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Email"
                  value={registerValues.email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-normal mb-2"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={registerValues.password}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                  type="submit"
                >
                  Submit
                </button>
                <Link
                  to="#"
                  className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs"></p>
          </div>
        </div>
    </>
    );
}
  export default Register
  
