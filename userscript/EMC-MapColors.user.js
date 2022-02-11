// ==UserScript==
// @name         EMC Dynmap Colors
// @version      0.1
// @description  show more color on emc dynmap for mega nations
// @updateURL    https://raw.githubusercontent.com/32Vache/emc-dynmap-colors/master/userscript/production.js
// @downloadURL  https://raw.githubusercontent.com/32Vache/emc-dynmap-colors/master/userscript/production.js
// @author       32Vache
// @include      https://earthmc.net/map*
// @include      http://earthmc.net/map*
// @include      https://emc-color.herokuapp.com*
// @grant        GM_webRequest
// @webRequest   [{"selector":{"include":"*://earthmc.net/map/tiles/_markers_/marker_earth.json"},"action":{"redirect":"https://emc-color.herokuapp.com/marker_earth.json"}}]

// ==/UserScript==

var currently_active_webrequest_rule = JSON.stringify(GM_info.script.webRequest); // == @webRequst header from above

GM_webRequest([{selector:{include:"*://earthmc.net/map/tiles/_markers_/marker_earth.json"},action:{redirect:"https://emc-color.herokuapp.com/marker_earth.json"}}], function(info, message, details) {
    console.log(info, message, details);
});