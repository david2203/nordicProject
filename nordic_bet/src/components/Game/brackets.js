import React, {useState, useEffect} from 'react'
import "../Brackets.css"
import server from "../Global/config";
import axios from "axios";

function Brackets() {
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
	  const instance = axios.create({ baseURL: server });
	  console.log(countriesArray)
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
			console.log(chunkedCountries[j])
			const sendTo = chunkedCountries[j][0].group
			console.log(sendTo)
			const teamArray = []
			const team1 = { "country":chunkedCountries[j][0].name, "score":chunkedCountries[j][0].group_score, "grp":chunkedCountries[j][0].group}
			const team2= { "country":chunkedCountries[j][1].name, "score":chunkedCountries[j][1].group_score,"grp":chunkedCountries[j][0].group}
			const team3= { "country":chunkedCountries[j][2].name, "score":chunkedCountries[j][2].group_score,"grp":chunkedCountries[j][0].group}
			const team4= { "country":chunkedCountries[j][3].name, "score":chunkedCountries[j][3].group_score,"grp":chunkedCountries[j][0].group}
			teamArray.push(team1,team2,team3,team4)
			console.log(teamArray)
			teamArray.sort(function(a, b) {
				return b.score - a.score;
			  });
			  
			const winner = teamArray[0].country
			const secondPlace = teamArray[1].country

			  if(teamArray[0].grp === "EURO Grp. A"){
				  
				const fetchGame1a = async () => {
					try {
						const response = await instance.get(`euro_events?eventname=1A-3CDE`);
						const id1a = response.data[0].id
						return id1a;
					} catch (err) {
						console.log(err)
					}
				}
				fetchGame1a().then((resp) => putWinner(resp))
				const putWinner = async (id) =>{
					await instance.put(`euro_events/${id}`, {
						home_team:winner,
					}
					)}
				
				
					const fetchGame2a = async () => {
						try {
							const response = await instance.get(`euro_events?eventname=2A-2C`);
							const id2a = response.data[0].id
							return id2a;
						} catch (err) {
							console.log(err)
						}
					}
					fetchGame2a().then((resp) => putSecond(resp))
					const putSecond = async (id) =>{
						await instance.put(`euro_events/${id}`, {
							home_team:secondPlace,
						}
						)}
				
			  }
			  
			console.log(winner, secondPlace)



			// const updateBracket = async()=>{
			// 	await instance.put(`euro_Events/${userBetId}`, {
			// 		Score:newScore
			// 	})
			// 	}
			//  updateBracket()
		}
	  }
	  
	}
	


    return (
        <>
        

         <head/>
	<meta charSet="utf-8"/>
	<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link href='https://fonts.googleapis.com/css?family=Holtwood+One+SC' rel='stylesheet' type='text/css'/>
	<link href='https://fonts.googleapis.com/css?family=Kaushan+Script|Herr+Von+Muellerhoff' rel='stylesheet' type='text/css'/>
	<link href='https://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'/>
	<link href='https://fonts.googleapis.com/css?family=Istok+Web|Roboto+Condensed:700' rel='stylesheet' type='text/css'/>
    <link rel="stylesheet" type="text/css" href="../Brackets.css"/>

	<title>Uefa Euro 2016</title>
<head/>
<body className="bracketsBody">
	<header className="hero">
    <div className="hero-wrap">
     <p className="intro" id="intro">Nordic Bet</p>
     <h2 className="intro" id="intro">Presenterar...</h2>
		 <h1 id="headline">Uefa Euro</h1>
		 <p className="year"><i className="fa fa-star"></i> 2016 <i className="fa fa-star"></i></p>
   </div>
	</header>


	<section id="bracket">
	<div className="container">
	<div className="split split-one">
		<div className="round round-one current">
			<div className="round-details">Åttondelsfinal<br/><span className="date">"DATE"</span></div>
			<ul className="matchup">
				<li className="team team-top">1A<span className="score">1 (4)</span></li>
				<li className="team team-bottom">3CDE<span className="score">1 (5)</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">1B<span className="score">0</span></li>
				<li className="team team-bottom">3ACD<span className="score">1</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">1C<span className="score">1</span></li>
				<li className="team team-bottom">3ABF<span className="score">0</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">1D<span className="score">0</span></li>
				<li className="team team-bottom">3BEF<span className="score">4</span></li>
			</ul>			
			<ul className="matchup">
				<li className="team team-top">1E<span className="score">3</span></li>
				<li className="team team-bottom">2D<span className="score">0</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">1F<span className="score">2</span></li>
				<li className="team team-bottom">2E<span className="score">0</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">2A<span className="score">2</span></li>
				<li className="team team-bottom">2C<span className="score">1</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">2B<span className="score">1</span></li>
				<li className="team team-bottom">2F<span className="score">2</span></li>
			</ul>										
		</div>	
        {/* <!-- END ROUND ONE --> */}

		<div className="round round-two">
			<div className="round-details">Kvartsfinal<br/><span className="date">"DATE"</span></div>			
			<ul className="matchup">
				<li className="team team-top">&nbsp;<span className="score">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">&nbsp;<span className="score">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">&nbsp;<span className="score">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">&nbsp;<span className="score">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
			</ul>										
		</div>	
        {/* !-- END ROUND TWO --> */}
		
		<div className="round round-three">
			<div className="round-details">Semi-Final<br/><span className="date">"DATE"</span></div>			
			<ul className="matchup">
				<li className="team team-top">&nbsp;<span className="score">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">&nbsp;<span className="score">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
			</ul>										
		</div>	
        {/* <!-- END ROUND THREE -->		 */}
	</div> 

<div className="champion">
		<div className="final">
			<i className="fa fa-trophy"></i>
			<div className="round-details">Final <br/><span className="date">"DATE"</span></div>		
			<ul className ="matchup championship">
				<li className="team team-top">&nbsp;<span className="vote-count">&nbsp;</span></li>
				<li className="team team-bottom">&nbsp;<span className="vote-count">&nbsp;</span></li>
			</ul>
		</div>
	</div>


	<div className="split split-two">
	</div>
	</div>
    <div/>
	</section>
	<section className="share">
			<div className="share-wrap">
				<a className="share-icon" href="https://twitter.com/_joebeason"><i className="fa fa-twitter"></i></a>
				{/* <a className="share-icon" href="#"><i className="fa fa-facebook"></i></a> */}
				{/* <a className="share-icon" href="#"><i className="fa fa-envelope"></i></a> */}
			</div>
	</section>
        </body>
        </>
    )
}

export default Brackets
