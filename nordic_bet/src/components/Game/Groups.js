import React from 'react'

function Groups() {


    return (
        <div>
             <table className="table table-hover w-25 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col"># Rank</th>
      <th scope="col">Username</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
  {/* {users.map((user,i)=>{
            return(
                <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} row={i}/>
            )
        })} */}
  </tbody>
</table>
        </div>
    )
}

export default Groups
