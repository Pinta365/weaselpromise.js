/**
 * @fileOverview Weasel Promise - a promise based node.js wrapper module for the <a href="https://www.warcraftlogs.com/v1/docs">Warcraft Logs API</a>
 * @author pintapoff@GitHub
 * @version 0.0.1
 * @license MIT
 * @example
 * //install with "npm install weaselpromise.js"
 * const api = require('weaselpromise.js');
 *
 * //Set the public WCL api-key that you get from https://www.warcraftlogs.com/accounts/changeuser
 * api.setApiKey('abcd123abcd123abcd123abcd123abcd123');
 *
 * //Optional parameters for the api call.
 * var params = {};
 *
 * //Call the function to list guild reports, can be filtered on start time and end time as a UNIX timestamp with the optional parameters @params.
 * api.getReportsGuild('carpe cerevisi', 'moonglade', 'eu').then((data) => {
 *   console.log(data);
 * });
 */

'use strict';

var https = require("https");

var exports = module.exports = {},
    apiKey = '';

/**
 * Serialize a parameters-object into a querystring format.
 *
 * @param {Object} obj
 * @return {String} querystring
 * @private
 */
function serializeParamString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

/**
 * Performs the actual data request from the WCL API service.
 *
 * @param {string} path - The api path
 * @param {object} params - Set of optional parameters
 * @param {apiCallback} callback - A callback to run
 * @private
 */
function getData(path, params) {
    var qs = !params ? {} : params;
    qs.api_key = apiKey;
    qs = serializeParamString(qs);
    
    var options = {
        "method": "GET",
        "hostname": "www.warcraftlogs.com",
        "port": 443,
        "path": "/v1" + encodeURI(path) + "?" + qs,
        "headers": {
            "cache-control": "no-cache"
        }
    };
    
    return new Promise((resolve, reject) => {
        var req = https.request(options, (res) => {
            
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            
            var parts = [];
            res.on('data', (part) => {
                parts.push(part);
            });
           
            res.on('end', () => {
                try {
                    parts = JSON.parse(Buffer.concat(parts).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(parts);
            });
        });
       
        req.on('error', (err) => {
            reject(err);
        });
        
        req.end();
    });
}

/**
 * A callback to run with the response and/or error from the WCL API call.
 *
 * @callback apiCallback
 * @param {Error} error - I case of an error it contains a new Error with the error message
 * @param {object} data - The data(JSON) return from the API
 * @private
 */


/**
 * Sets your Warcraft Logs API-key which is needed to use the WCL API calls.
 * 
 * @param {string} key - your api-key from https://www.warcraftlogs.com/accounts/changeuser
 * @returns {boolean} true/false for setting the API Key
 * @public
 */
exports.setApiKey = (key) => {
    if (key && key.trim() != '') {
        apiKey = key;
        return true;
    }
    return false;
};



/**
 * Gets a list of available zones used throughout the API. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Zones/zones_get| this} section of the API for full coverage of what is returned.
 *
 * @returns {Promise} Promise object
 * @public
 */
exports.getZones = (callback) => {
    return new Promise((resolve, reject) => {
        getData('/zones', null).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets a list of available classes used throughout the API. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Classes/classes_get| this} section of the API for full coverage of what is returned.
 *
 * @returns {Promise} Promise object
 * @public
 */
exports.getClasses = () => {
    return new Promise((resolve, reject) => {
        getData('/classes', null).then((data) => {
            resolve(data);
        });
    });
};


/**
 * Gets data concerning rankings of a specific encounter. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Rankings/rankings_encounter_encounterID_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {int} encounterID - an integer representing an encounter
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getRankingsEncounter = (encounterID, params) => {
    return new Promise((resolve, reject) => {
        getData('/rankings/encounter/' + encounterID.toString(), params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets ranked fights for a specific character. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Rankings/rankings_character_characterName_serverName_serverRegion_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} characterName - the character name
 * @param {string} serverName - the server name
 * @param {string} serverRegion - the server region
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getRankingsCharacter = (characterName, serverName, serverRegion, params) => {
    return new Promise((resolve, reject) => {
        getData('/rankings/character/' + characterName + '/' + serverName + '/' + serverRegion, params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets parses for a specific character. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Parses/parses_character_characterName_serverName_serverRegion_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} characterName - the character name
 * @param {string} serverName - the server name
 * @param {string} serverRegion - the server region
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getParsesCharacter = (characterName, serverName, serverRegion, params) => {
    return new Promise((resolve, reject) => {
        getData('/parses/character/' + characterName + '/' + serverName + '/' + serverRegion, params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets reports for a specific guild. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Reports/reports_guild_guildName_serverName_serverRegion_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} guildName - the guild name
 * @param {string} guildServer - the server name
 * @param {string} guildRegion - the guilds region
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getReportsGuild = (guildName, guildServer, guildRegion, params) => {
    return new Promise((resolve, reject) => {
        getData('/reports/guild/' + guildName + '/' + guildServer + '/' + guildRegion, params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets reports for a specific user. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Reports/reports_guild_guildName_serverName_serverRegion_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} userName - the username
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getReportsUser = (userName, params) => {
    return new Promise((resolve, reject) => {
        getData('/reports/user' + userName, params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets fights and the participants for a specific report.
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Report/report_fights_code_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} code - the report code
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getReportFights = (code, params) => {
    return new Promise((resolve, reject) => {
        getData('/report/fights/' + code, params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets events such as damage, healing, cast, buff and debuff events for a specific report.
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Report/report_events_code_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} code - the report code
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getReportEvents = (code, params) => {
    return new Promise((resolve, reject) => {
        getData('/report/events/' + code, params).then((data) => {
            resolve(data);
        });
    });
};

/**
 * Gets a table of entries for a specific report. More risk of being changed than the other calls because it follows the changes on the table panes over at the site. Read the API docs.
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Report/report_tables_view_code_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} view - The type of data requested.
 * @param {string} code - the report code
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
exports.getReportTables = (view, code, params) => {
    return new Promise((resolve, reject) => {
        getData('/report/tables/' + view + '/' + code, params).then((data) => {
            resolve(data);
        });
    });
};
