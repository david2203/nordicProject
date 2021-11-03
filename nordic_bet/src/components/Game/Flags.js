function getTeamFlag(team) {
  let countries = {
    Poland: "PL",
    Albania: "AL",
    England: "GB",
    Germany: "DE",
    France: "FR",
    Ukraine: "UA",
    Romania: "RO",
    Switzerland: "CH",
    Wales: "WS",
    Slovakia: "SK",
    Spain: "ES",
    Sweden: "SE",
    "N.Ireland": "JE",
    Ireland: "IE",
    Russia: "RU",
    Belgium: "BE",
    Croatia: "HR",
    "Czech Republic": "CZ",
    Italy: "IT",
    Hungary: "HU",
    Iceland: "IS",
    Portugal: "PT",
    Turkey: "TR",
    Austria: "AT",
  };

  let flag = "AQ";

  if (countries.hasOwnProperty(team)) {
    flag = countries[team];
  }
  return flag;
}

function setTeamFlag(side, team) {
  if (side === "away") {
    return getTeamFlag(team);
  } else if (side === "home") {
    return getTeamFlag(team);
  }
}
export default setTeamFlag;
export { getTeamFlag };
