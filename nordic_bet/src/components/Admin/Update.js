import React, {useState, useEffect} from 'react'
import "../Brackets.css"
import server from "../Global/config";
import axios from "axios";
function Update() {
    const chunkedGames = [];
	const chunkedCountries = [];

	const useGetGames = () => {
	  const [gamesArray, setGamesArray] = useState([]);
	  const [countriesArray, setCountriesArray] = useState([]);

	  const [loading, setLoading] = useState(true);
  
	  const groups = [
		"EURO Grp. A",
		"EURO Grp. B",
		"EURO Grp. C",
		"EURO Grp. D",
		"EURO Grp. E",
		"EURO Grp. F",
	  ];
  
	  const instance = axios.create({ baseURL: server });
  
	  const fetchCountries = async () => {
		  try {
			  const data2 = await instance.get(`countries?_sort=group:ASC`);
			  setCountriesArray(data2.data);

		  } catch (err) {
			  console.log(err)
		  }
	  }
	  const fetchGames = async () => {
		try {
		  for (let i = 0; i < groups.length; i++) {
			const { data } = await instance.get(`Euro_events?grp=${groups[i]}`);
			setGamesArray((games) => [...games, ...data]);
		  }
		} catch (err) {
		  console.log(err);
		}
  
		setLoading(false);
	  };
  
	  useEffect(() => {
		fetchCountries();
		fetchGames();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
  
	  return { loading, gamesArray, countriesArray };
	};
  
	const { loading, gamesArray, countriesArray } = useGetGames();
  
	if (!loading) {
	  // All data should be available
	  const thirdPlaceArray = []
	  const instance = axios.create({ baseURL: server });
	  for (let i = 0; i < gamesArray.length; i += 6) {
		chunkedGames.push(gamesArray.slice(i, i + 6));
	  }
	  for (let i = 0; i < countriesArray.length; i += 4) {
		chunkedCountries.push(countriesArray.slice(i, i + 4));
	  }
	  for (let j = 0; j < chunkedGames.length; j++){
		var counter = 0
		for(let i = 0; i < chunkedGames[j].length; i++) {
			if(chunkedGames[j][i].status === "Finished"){
				counter ++
			}
		}
		if (counter === 6){
			
			const teamArray = []
			const team1 = { "country":chunkedCountries[j][0].name, "score":chunkedCountries[j][0].group_score, "grp":chunkedCountries[j][0].group}
			const team2= { "country":chunkedCountries[j][1].name, "score":chunkedCountries[j][1].group_score,"grp":chunkedCountries[j][0].group}
			const team3= { "country":chunkedCountries[j][2].name, "score":chunkedCountries[j][2].group_score,"grp":chunkedCountries[j][0].group}
			const team4= { "country":chunkedCountries[j][3].name, "score":chunkedCountries[j][3].group_score,"grp":chunkedCountries[j][0].group}
			teamArray.push(team1,team2,team3,team4)
			teamArray.sort(function(a, b) {
				return b.score - a.score;
			  });
			  
			const winner = teamArray[0].country
			const secondPlace = teamArray[1].country
			const thirdPlace = teamArray[2]
			thirdPlaceArray.push(thirdPlace)
			
			const groupsObject = {
				"EURO Grp. A" : {
					games: ["1A-3CDE","2A-2C"],
					side: ["home","home"],
					place: [winner,secondPlace]
				}, 
				"EURO Grp. B" : {
					games: ["1B-ACD","2B-2F"],
					side: ["home","home"],
					place: [winner,secondPlace]
				},
				"EURO Grp. C" : {
					games: ["1A-3CDE","2A-2C"],
					side: ["home","home"],
					place: [winner,secondPlace]
				},
				"EURO Grp. D" : {
					games: ["1A-3CDE","2A-2C"],
					side: ["home","home"],
					place: [winner,secondPlace]
				}, 
				"EURO Grp. E" : {
					games: ["1A-3CDE","2A-2C"],
					side: ["home","home"],
					place: [winner,secondPlace]
				}, 
				"EURO Grp. F" : {
					games: ["1A-3CDE","2A-2C"],
					side: ["home","home"],
					place: [winner,secondPlace]
				} 
			}
			const groupname = teamArray[0].grp;
			if(groupsObject.hasOwnProperty(groupname)){
				const fetchGame1a = async (gamename) => {
					try {
						const response = await instance.get(`euro_events?eventname=${gamename}`);
						const id1a = response.data[0].id
						return id1a;
					} catch (err) {
						console.log(err)
					}
				}
				//Lägg till team i event
				//fetchGame1a().then((resp) => putWinner(resp))
				const putWinner = async (id, side, place) =>{
					
					if (side === "home") {
					await instance.put(`euro_events/${id}`, {
						home_team:place,
					} 
					)} else if (side === "away") {
						await instance.put(`euro_events/${id}`, {
							away_team:place,
						} 
						)
					}
				}
				if (groupsObject[groupname].games.length  && groupsObject[groupname].side.length) {
					groupsObject[groupname].games.forEach((game,index) => {
						fetchGame1a(game)
								.then(id => putWinner(id, groupsObject[groupname].side[index], groupsObject[groupname].place[index]))
					});

				}
				//Hämta game id
				 
				
				
					// const fetchGame2a = async () => {
					// 	try {
					// 		const response = await instance.get(`euro_events?eventname=2A-2C`);
					// 		const id2a = response.data[0].id
					// 		return id2a;
					// 	} catch (err) {
					// 		console.log(err)
					// 	}
					// }
					// fetchGame2a().then((resp) => putSecond(resp))
					// const putSecond = async (id) =>{
					// 	await instance.put(`euro_events/${id}`, {
					// 		home_team:secondPlace,
					// 	}
					// 	)}
			  }
			//   if(teamArray[0].grp === "EURO Grp. A"){
				  
			// 	const fetchGame1a = async () => {
			// 		try {
			// 			const response = await instance.get(`euro_events?eventname=1A-3CDE`);
			// 			const id1a = response.data[0].id
			// 			return id1a;
			// 		} catch (err) {
			// 			console.log(err)
			// 		}
			// 	}
			// 	fetchGame1a().then((resp) => putWinner(resp))
			// 	const putWinner = async (id) =>{
			// 		await instance.put(`euro_events/${id}`, {
			// 			home_team:winner,
			// 		}
			// 		)}
				
				
			// 		const fetchGame2a = async () => {
			// 			try {
			// 				const response = await instance.get(`euro_events?eventname=2A-2C`);
			// 				const id2a = response.data[0].id
			// 				return id2a;
			// 			} catch (err) {
			// 				console.log(err)
			// 			}
			// 		}
			// 		fetchGame2a().then((resp) => putSecond(resp))
			// 		const putSecond = async (id) =>{
			// 			await instance.put(`euro_events/${id}`, {
			// 				home_team:secondPlace,
			// 			}
			// 			)}
			//   }
			//   if(teamArray[0].grp === "EURO Grp. B"){
				  
			// 	const fetchGame1a = async () => {
			// 		try {
			// 			const response = await instance.get(`euro_events?eventname=1B-3ACD`);
			// 			const id1b = response.data[0].id
			// 			return id1b;
			// 		} catch (err) {
			// 			console.log(err)
			// 		}
			// 	}
			// 	fetchGame1a().then((resp) => putWinner(resp))
			// 	const putWinner = async (id) =>{
			// 		await instance.put(`euro_events/${id}`, {
			// 			home_team:winner,
			// 		}
			// 		)}
				
				
			// 		const fetchGame2a = async () => {
			// 			try {
			// 				const response = await instance.get(`euro_events?eventname=2B-2F`);
			// 				const id2b = response.data[0].id
			// 				return id2b;
			// 			} catch (err) {
			// 				console.log(err)
			// 			}
			// 		}
			// 		fetchGame2a().then((resp) => putSecond(resp))
			// 		const putSecond = async (id) =>{
			// 			await instance.put(`euro_events/${id}`, {
			// 				home_team:secondPlace,
			// 			}
			// 			)}
			//   }
			//   if(teamArray[0].grp === "EURO Grp. C"){
				  
			// 	const fetchGame1a = async () => {
			// 		try {
			// 			const response = await instance.get(`euro_events?eventname=1C-3ABF`);
			// 			const id1c = response.data[0].id
			// 			return id1c;
			// 		} catch (err) {
			// 			console.log(err)
			// 		}
			// 	}
			// 	fetchGame1a().then((resp) => putWinner(resp))
			// 	const putWinner = async (id) =>{
			// 		await instance.put(`euro_events/${id}`, {
			// 			home_team:winner,
			// 		}
			// 		)}
				
				
			// 		const fetchGame2a = async () => {
			// 			try {
			// 				const response = await instance.get(`euro_events?eventname=2A-2C`);
			// 				const id2c = response.data[0].id
			// 				return id2c;
			// 			} catch (err) {
			// 				console.log(err)
			// 			}
			// 		}
			// 		fetchGame2a().then((resp) => putSecond(resp))
			// 		const putSecond = async (id) =>{
			// 			await instance.put(`euro_events/${id}`, {
			// 				away_team:secondPlace,
			// 			}
			// 			)}
			//   }
			//   if(teamArray[0].grp === "EURO Grp. D"){
				  
			// 	const fetchGame1a = async () => {
			// 		try {
			// 			const response = await instance.get(`euro_events?eventname=1D-3BEF`);
			// 			const id1d = response.data[0].id
			// 			return id1d;
			// 		} catch (err) {
			// 			console.log(err)
			// 		}
			// 	}
			// 	fetchGame1a().then((resp) => putWinner(resp))
			// 	const putWinner = async (id) =>{
			// 		await instance.put(`euro_events/${id}`, {
			// 			home_team:winner,
			// 		}
			// 		)}
				
				
			// 		const fetchGame2a = async () => {
			// 			try {
			// 				const response = await instance.get(`euro_events?eventname=1E-2D`);
			// 				const id2d = response.data[0].id
			// 				return id2d;
			// 			} catch (err) {
			// 				console.log(err)
			// 			}
			// 		}
			// 		fetchGame2a().then((resp) => putSecond(resp))
			// 		const putSecond = async (id) =>{
			// 			await instance.put(`euro_events/${id}`, {
			// 				away_team:secondPlace,
			// 			}
			// 			)}
			//   }
			//   if(teamArray[0].grp === "EURO Grp. E"){
				  
			// 	const fetchGame1a = async () => {
			// 		try {
			// 			const response = await instance.get(`euro_events?eventname=1E-2D`);
			// 			const id1e = response.data[0].id
			// 			return id1e;
			// 		} catch (err) {
			// 			console.log(err)
			// 		}
			// 	}
			// 	fetchGame1a().then((resp) => putWinner(resp))
			// 	const putWinner = async (id) =>{
			// 		await instance.put(`euro_events/${id}`, {
			// 			home_team:winner,
			// 		}
			// 		)}
				
				
			// 		const fetchGame2a = async () => {
			// 			try {
			// 				const response = await instance.get(`euro_events?eventname=1F-2E`);
			// 				const id2e = response.data[0].id
			// 				return id2e;
			// 			} catch (err) {
			// 				console.log(err)
			// 			}
			// 		}
			// 		fetchGame2a().then((resp) => putSecond(resp))
			// 		const putSecond = async (id) =>{
			// 			await instance.put(`euro_events/${id}`, {
			// 				away_team:secondPlace,
			// 			}
			// 			)}
			//   }
			//   if(teamArray[0].grp === "EURO Grp. F"){
				  
			// 	const fetchGame1a = async () => {
			// 		try {
			// 			const response = await instance.get(`euro_events?eventname=1F-2E`);
			// 			const id1f = response.data[0].id
			// 			return id1f;
			// 		} catch (err) {
			// 			console.log(err)
			// 		}
			// 	}
			// 	fetchGame1a().then((resp) => putWinner(resp))
			// 	const putWinner = async (id) =>{
			// 		await instance.put(`euro_events/${id}`, {
			// 			home_team:winner,
			// 		}
			// 		)}
				
				
			// 		const fetchGame2a = async () => {
			// 			try {
			// 				const response = await instance.get(`euro_events?eventname=2B-2F`);
			// 				const id2f = response.data[0].id
			// 				return id2f;
			// 			} catch (err) {
			// 				console.log(err)
			// 			}
			// 		}
			// 		fetchGame2a().then((resp) => putSecond(resp))
			// 		const putSecond = async (id) =>{
			// 			await instance.put(`euro_events/${id}`, {
			// 				away_team:secondPlace,
			// 			}
			// 			)}
			//   }



			// const updateBracket = async()=>{
			// 	await instance.put(`euro_Events/${userBetId}`, {
			// 		Score:newScore
			// 	})
			// 	}
			//  updateBracket()
		}
	  }
	  if (thirdPlaceArray.length === 6 ) {
		thirdPlaceArray.sort(function(a, b) {
			return b.score - a.score;
		  });
		  const thirdWinner = thirdPlaceArray[0].country
		  const thirdSecond = thirdPlaceArray[1].country
		  const thirdThird = thirdPlaceArray[2].country
		  const thirdFourth = thirdPlaceArray[3].country

		  const fetchGame1 = async () => {
			try {
				const response = await instance.get(`euro_events?eventname=1A-3CDE`);
				const id31 = response.data[0].id
				return id31;
			} catch (err) {
				console.log(err)
			}
		}
		fetchGame1().then((resp) => putWinner(resp))
		const putWinner = async (id) =>{
			await instance.put(`euro_events/${id}`, {
				away_team:thirdWinner,
			}
			)}
		
		
			const fetchGame2 = async () => {
				try {
					const response = await instance.get(`euro_events?eventname=1B-3ACD`);
					const id32 = response.data[0].id
					return id32;
				} catch (err) {
					console.log(err)
				}
			}
			fetchGame2().then((resp) => putSecond(resp))
			const putSecond = async (id) =>{
				await instance.put(`euro_events/${id}`, {
					away_team:thirdSecond,
				}
				)}
				const fetchGame3 = async () => {
					try {
						const response = await instance.get(`euro_events?eventname=1C-3ABF`);
						const id33 = response.data[0].id
						return id33;
					} catch (err) {
						console.log(err)
					}
				}
				fetchGame3().then((resp) => putThird(resp))
				const putThird = async (id) =>{
					await instance.put(`euro_events/${id}`, {
						away_team:thirdThird,
					}
					)}
					const fetchGame4 = async () => {
						try {
							const response = await instance.get(`euro_events?eventname=1D-3BEF`);
							const id34 = response.data[0].id
							return id34;
						} catch (err) {
							console.log(err)
						}
					}
					fetchGame4().then((resp) => putFourth(resp))
					const putFourth = async (id) =>{
						await instance.put(`euro_events/${id}`, {
							away_team:thirdFourth,
						}
						)}
	  }
	  
	}
    return (
        <div>
            {console.log("updated games")}
        </div>
    )
}

export default Update

