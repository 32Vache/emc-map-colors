const https = require("https");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

var app = (module.exports = express());
app.use(cors());

let colors = [
	{"name": "Lechian Empire", "nations": ["Poland", "Galicia", "Tasmania", "Croatia", "Bulgaria", "Lithuania"], "color": ["#9F0807"]},
	{"name": "Angevin Empire", "nations": ["France", "Switzerland", "Hannover", "Prussia", "Monaco", "Britain", "Scotland", "Norway", "Sweden"], "color": ["#DC281E"]},
	{"name": "Greater Roman Empire", "nations": ["SPQR", "Italia", "Romania", "Greater_Romania"], "color": ["#B200FF"]},
	{"name": "Spanish Empire", "nations": ["Iberian_Angola", "Spain", "Spanish_Antilles", "Guinea", "Canarias", "Uruguay", "Argentina", "Peru", "Chile", "Paraguay", "Portugal", "Bolivia", "Colombia", "Patagonia"], "color": ["#FFD800"]},
	{"name": "Kingdom of France", "nations": ["Francia", "Yavanarajya", "center_africa", "Nepal", "India", "Liverpool", "Swedish_Empire", "Maurya_Dynasty"], "color": ["#0F1D6E"]},
	{"name": "German Confederation", "nations": ["Mexican-Empire", "San_Luis_Potosi", "Chihuahua", "Austria", "Belgium", "Saxony", "Barinas", "Germany", "H.R.E.", "Olmec", "South-Pole", "EUM", "Preußen"], "color": ["#FFE97F"]},
	{"name": "Caucasus Empire", "nations": ["Greater-Armenia", "Sakartvelo"], "color": ["#A5FF7F"]},
	{"name": "Second Finnish Empire", "nations": ["Lapland", "Suomi", "Tavastia"], "color": ["#93D2FF"]},
	{"name": "Estonian Empire", "nations": ["Estonia", "Finnmark", "Kievan_Rus"], "color": ["#5FBFBF"]},
	
	{"name": "True Russia", "nations": ["CCCP", "Yakutia", "SovietUnion", "Far_East", "Northern_Russia", "USSR", "Republic_of_Komi", "Russian_Dominion", "Sibirya", "Yamalia", "Contact_a_staff", "tomsk", "Karelia", "Verkhoyansk", "Siberian_Empire"], "color": ["#FF6A00"]},
	{"name": "Russia", "nations": ["East_Russia", "Tzarist_Ukraine", "Russia", "Russian_Empire", "South_Russia", "Taymyria", "Northern_Russia", "Asia", "Republic_of_Rus", "Wrangel", "Sibir", "Far", "Hungary", "Yuzhny", "West_Russia", "Greater_Russia", "rule4.1", "Khabarovsk", "Pakistan"], "color": ["#FFB27F"]},
	{"name": "Israel", "nations": ["Israel", "Himyar", "Qatar", "Europe", "Egypt"], "color": ["#0038B8"]},
	{"name": "Japanese Empire", "nations": ["Japan", "Japan_North", "Korea", "Shimazu", "Toban", "Prince_George", "Yamato", "Ooka", "Koyuk", "xiongnu", "Tugur", "yokuso", "Chumikan", "Ayano_Mainsky", "Bokkai", "Dai"], "color": ["#BC002D"]},
	{"name": "Joseon", "nations": ["Joseon", "Manchukuo"], "color": ["#FFCB0A"]},
	{"name": "People's Republic of China", "nations": ["PRC", "Northeast_China", "PRC_XinJiang", "PRC_Fujian", "PRC_Jilin", "northPRC", "west_PRC", "Shu"], "color": ["#FF4C00"]},
	{"name": "Han Dynasty", "nations": ["Han", "Hong_Kong", "Chu", "South_Sea", "Iceland", "Bei_qi", "Cape_Dorset"], "color": ["#282828"]},
	{"name": "Liao", "nations": ["Liao", "Great_Liao"], "color": ["#01315A"]},
	{"name": "Federation of the East", "nations": ["Philippines", "McMurdo", "Mindanao", "Mozambique"], "color": ["#0038A8"]},
	{"name": "Indochina", "nations": ["Indochina", "Sumatra", "Vietnam"], "color": ["#FFFFFF"]},
	{"name": "Majapahit Empire", "nations": ["Majapahit", "Dutch_Indies", "Sulawesi", "Sarawak", "Maluku"], "color": ["#FFDF3F"]},
	{"name": "Taiwan", "nations": ["Taiwan", "Takasago"], "color": ["#7FFFFF"]},
	
	{"name": "Oniyama Shogunate", "nations": ["Grasberg", "Pulau_Japen", "Lützow-holm_bay", "Amazonas", "Kepulauan_Aru"], "color": ["#41F226"]},
	{"name": "Third Victorian Empire", "nations": ["Long_Bay", "Ulimaroa", "Oceania", "Huron", "Kemet", "NorthAustralia", "Cape_York", "SouthAustralia", "Nicaragua"], "color": ["#003FA3"]},
	{"name": "Fourth Australian Empire", "nations": ["Australia", "SouthTasmania", "Peel", "Straya", "Kimberley", "WesternAustralia", "Neale", "Papua"], "color": ["#FF8800"]},
	{"name": "New_Zealand", "nations": ["New_Zealand", "South_Island"], "color": ["#F5281C"]},
	
	{"name": "Second Nubian Empire", "nations": ["Nubia", "Kasai", "Nejd", "Namibia", "Molodezhnaya", "Bura", "Songhai", "Cote_Divoire", "Algeria", "Cameroon", "South_Sudan", "Fezzan", "Tripolitania", "Ghana", "Comoros", "Libya", "Senegal", "Ifriqiya", "Dzata", "Mauritania", "Rhodesia", "SADR", "Gabon", "Cape", "Zanzibar", "Katanga", "Cape_Verde", "Zimbabwe", "Riodeoro"], "color": ["#7F3300"]},
	{"name": "Federation of the Indian Ocean", "nations": ["Ancient_Egypt", "Somalia", "Congo_FreeState", "Egypte_Federe", "North_Sudan", "Oman", "Kemet"], "color": ["#45818E"]},
	{"name": "Tanzanian Empire", "nations": ["Tanzania", "Azande", "Lake_Nyasa", "UAE", "Uganda", "Sudan", "Syria", "New_Angola", "Djibouti", "Ethiopia", "Madeira", "Agadez", "New_Caledonia", "South_Tanzania", "Suedia"], "color": ["#1EB53A"]},
	
	{"name": "Republic of Brazil", "nations": ["Brazil", "Peru-Bolivia", "Manabi"], "color": ["#009F3A"]},
	
	{"name": "Theocratic Confederacy of Antarctica", "nations": ["SSRBV", "Amery", "Antarctic_Empire", "Antarctic", "Seljuk_Empire", "Victoria_Land"], "color": ["#7FFFFF"]},
	{"name": "Egalitarist People's Republic of Antarctica", "nations": ["Casey", "Sandwich_Islands", "Marie_Byrd_Land", "Antarctica"], "color": ["#FED700"]},
	
	{"name": "Cuban Empire", "nations": ["Cuba", "Haiti", "New_Granada", "Cordoba", "Yucatan", "Dominican", "Miami", "Costa_Rica", "Panama", "Nicaragua"], "color": ["#CC0001"]},
	{"name": "Republic of Rio Grande", "nations": ["Rio_Grande", "Lone_Star", "New_Mexico"], "color": ["#000000"]},
	{"name": "Texico Empire", "nations": ["Texas_Republic", "Pueblo", "Zapotec"], "color": ["#002868"]},
	{"name": "State of Jefferson", "nations": ["Jefferson", "RoughAndReady", "Utah", "Oregon", "Deseret", "California", "Baja", "Nevada", "Navajo"], "color": ["#009900"]},
	{"name": "Illinois Empire", "nations": ["Illinois", "Indiana", "United_States", "Missouri", "West_Jersey", "South_Carolina", "West_Virginia", "kingsport", "Iowa"], "color": ["#00F6FF"]},
	{"name": "United States of America", "nations": ["New_Jersey", "New_York", "Ohio", "America", "Pennsylvania", "Hawaii", "Empire_State", "Tibet", "Yemen", "CSA", "Alabama", "Georgia", "USA", "Guam", "Minnesota", "Wisconsin"], "color": ["#0052FF"]},
	{"name": "Canadian Empire", "nations": ["Quebec", "Baffin", "Hall", "Canada", "Ellesmere", "Avannaa", "Saskatchewan", "HBC", "Hollis", "ContactStaff4.1", "Disko_Bay", "Arctic_Islands", "Cumberland", "Klondike", "Iroquois", "Nouvelle-France", "Maine"], "color": ["#CC3F4F"]},
	{"name": "Salish Confederation", "nations": ["Canadian_Rockies", "British_Columbia", "Nez_Perce", "Keewatin"], "color": ["#FFFFFF"]},
	{"name": "Columbian Empire", "nations": ["Columbia", "Sahtu", "October_Island"], "color": ["#0000CC"]},
	{"name": "Alaskan Tsardom", "nations": ["Kodiak", "Anchorage", "Bering_Strait", "Yukon"], "color": ["#011DC1"]},
	{"name": "Republic of Cascadia", "nations": ["Bhutan", "Cascadia", "Colorado", "Queen_Charlotte", "Slave_Lake", "Tlingit", "Victoria_Island", "Wyoming"], "color": ["#002200"]},
	{"name": "Grand Maritime Federation", "nations": ["Woodland_Cree", "Angola", "Bermuda", "North_America", "Labrador", "Acadia", "Avalon", "Western_Sahara", "Keewatin", "North_Ontario"], "color": ["#003865"]}
	
];

// Builds recolored marker_earth.json
// Runs every 5 minutes
setInterval(function () {
  https.get(
    "https://earthmc.net/map/tiles/_markers_/marker_earth.json",
    function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var Response = JSON.parse(body);
        var areas = Response["sets"]["townyPlugin.markerset"]["areas"];

        // Iterate through areas and recolor if necessary
        for (let i in areas) {
          var desc = areas[i]["desc"];
          let desc_title = desc.match(
            /<span style=\"font-size:120%\">(.+?)<\/span>/
          );
          if (desc_title) {
            desc_title = desc_title[1];

            if (desc_title) {
              let nation = desc_title.match(/.+? \((.+?)\)$/);
              if (nation) {
                nation = nation[1];
                if (nation) {
                  // Check if nation has recolor

                  for (let e of colors) {
                    let nats = e["nations"];
                    for (let n of nats) {
                      if (n.toLowerCase() === nation.toLowerCase()) {
                        console.log(`Recolored ${nation}!`);
                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "fillcolor"
                        ] = e["color"][0];
                        Response["sets"]["townyPlugin.markerset"]["areas"][i][
                          "color"
                        ] = e["color"][1] || e["color"][0];
                      }
                    }
                  }
                }
              }
            }
          }
        }

        var final = JSON.stringify(Response);
        fs.writeFileSync("marker_earth.json", final, (err) => {
          if (err) console.log(err);
        });
      });

      res.on("error", function (r) {
        console.log(e);
      });
    }
  );
}, 300000); // 5 minutes

// Passes the recolored marker_earth.json when requested
app.get("/:file(*)", function (req, re, next) {
  var file = req.params.file,
    path = __dirname + "/" + file;
  re.sendFile(path);
  console.log("marker_earth.json sent!");
});

app.listen(process.env.PORT);
console.log("Express started on port %d", process.env.PORT);