import React from 'react'

function Group({eventname,status}) {
    console.log(eventname)
    return (
        <div>
            
    <tr>
      <th scope="row">1</th>
      <td>{eventname}</td>
      <td>{status}</td>   
    </tr> 
        </div>
    )
}

export default Group
