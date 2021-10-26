import React from 'react'

function Brackets() {
    return (
        <>
        
        <div/>
         <head/>
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link href='https://fonts.googleapis.com/css?family=Holtwood+One+SC' rel='stylesheet' type='text/css'/>
	<link href='https://fonts.googleapis.com/css?family=Kaushan+Script|Herr+Von+Muellerhoff' rel='stylesheet' type='text/css'/>
	<link href='https://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'/>
	<link href='https://fonts.googleapis.com/css?family=Istok+Web|Roboto+Condensed:700' rel='stylesheet' type='text/css'/>
    <link rel="stylesheet" type="text/css" href="./Brackets.css"/>

	<title>Uefa Euro 2016</title>
<head/>
<body/>
	<header className="hero">
    <div className="hero-wrap">
     <p className="intro" id="intro">Nordic Bet</p>
     <h2 className="intro" id="intro">Presenterar...</h2>
		 <h1 id="headline">Uefa Euro</h1>
		 <p className="year"><i className="fa fa-star"></i> 2016 <i className="fa fa-star"></i></p>
   </div>
	</header>


	<section id="bracket"/>
	<div className="container">
	<div className="split split-one">
		<div className="round round-one current">
			<div className="round-details">Åttondelsfinal<br/><span className="date">"DATE"</span></div>
			<ul className="matchup">
				<li className="team team-top">Switzerland<span className="score">1 (4)</span></li>
				<li className="team team-bottom">Poland<span className="score">1 (5)</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">Croatia<span className="score">0</span></li>
				<li className="team team-bottom">Portugal<span className="score">1</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">Wales<span className="score">1</span></li>
				<li className="team team-bottom">Northern Ireland<span className="score">0</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">Hungary<span className="score">0</span></li>
				<li className="team team-bottom">Belgium<span className="score">4</span></li>
			</ul>			
			<ul className="matchup">
				<li className="team team-top">Germany<span className="score">3</span></li>
				<li className="team team-bottom">Slovakia<span className="score">0</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">Italy<span className="score">2</span></li>
				<li className="team team-bottom">Spain<span className="score">0</span></li>
			</ul>	
			<ul className="matchup">
				<li className="team team-top">France<span className="score">2</span></li>
				<li className="team team-bottom">Republic of Ireland<span className="score">1</span></li>
			</ul>
			<ul className="matchup">
				<li className="team team-top">England<span className="score">1</span></li>
				<li className="team team-bottom">Iceland<span className="score">2</span></li>
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
	<section/>
	<section className="share">
			<div className="share-wrap">
				<a className="share-icon" href="https://twitter.com/_joebeason"><i className="fa fa-twitter"></i></a>
				<a className="share-icon" href="#"><i className="fa fa-facebook"></i></a>
				<a className="share-icon" href="#"><i className="fa fa-envelope"></i></a>
			</div>
	<section/>
        <div/>
        </>
    )
}

export default Brackets
