import React, {useState, useEffect} from "react";
import server from "./Global/config";
// import axios from "axios";



function Scorecard({id,username,score,avatar,row,}) {
    const [url, setUrl] = useState('https://gravatar.com/avatar/a0310ba74bcd933a1f4a3cb00de31fea?s=400&d=mp&r=x')

useEffect(() => {

if(avatar) {

const avatarUrl = avatar.formats.small.url

setUrl(server + avatarUrl)

}

}, [])
    return (
        <>
    <tr>
      <th scope="row">{row +1 }</th>
      <td> <img
  src={url}
  style={{width: '50px',
          height: '50px',
          backgroundSize: 'cover',
          display: 'block',
          objectFit: 'cover'
          }}
          className='rounded-circle'
  alt=""
/></td>
      <td>{username}</td>
      <td>{score}</td>   
    </tr> 
        </>
    )
}

export default Scorecard
