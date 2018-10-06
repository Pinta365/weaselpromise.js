Weaselpromise.js
=========
Weasel is a promise based wrapper for the [Warcraft Logs API](https://www.warcraftlogs.com/v1/docs). The name Weasel comes from the sites abbreviation WCL that could be pronounced 'Weasel'... I guess. :)

## Installing with NPM
```
npm install weaselpromise.js
```

## Usage

```javascript
const api = require('weaselpromise.js');

//Set the public WCL api-key that you get from https://www.warcraftlogs.com/accounts/changeuser
api.setApiKey('abc123abcd123');

//Optional parameters for the api call, not used this time.
let params = {};

//Very crudely prints the number of fights on the latest guild report.. :)
async function numberOfFights() {
    try {
        let reports         = await api.getReportsGuild('carpe cerevisi', 'moonglade', 'eu', params);
        let latestReport    = await api.getReportFights(reports[0].id, params);
        
        console.log('Number of fights:', latestReport.fights.length);
    }
    catch (err) {
        console.log('We caught an error: ' + err.message);
    }
}

numberOfFights();

```

## Wrapper functions and details

#### getZones
```
/**
 * Gets a list of available zones used throughout the API. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Zones/zones_get| this} section of the API for full coverage of what is returned.
 *
 * @returns {Promise} Promise object
 * @public
 */
```
#### getClasses
```
/**
 * Gets a list of available classes used throughout the API. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Classes/classes_get| this} section of the API for full coverage of what is returned.
 *
 * @returns {Promise} Promise object
 * @public
 */
```
#### getRankingsEncounter
```
/**
 * Gets data concerning rankings of a specific encounter. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Rankings/rankings_encounter_encounterID_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {int} encounterID - an integer representing an encounter
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
```
#### getRankingsCharacter
```
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
```
#### getParsesCharacter
```
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
```
#### getReportsGuild
```
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
```
#### getReportsUser
```
/**
 * Gets reports for a specific user. 
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Reports/reports_guild_guildName_serverName_serverRegion_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} userName - the username
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
```
#### getReportFights
```
/**
 * Gets fights and the participants for a specific report.
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Report/report_fights_code_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} code - the report code
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
```
#### getReportEvents
```
/**
 * Gets events such as damage, healing, cast, buff and debuff events for a specific report.
 * Check out {@link https://www.warcraftlogs.com/v1/docs#!/Report/report_events_code_get| this} section of the API for full coverage of what is returned and what parameters are available.
 *
 * @param {string} code - the report code
 * @param {object} params - optional parameters
 * @returns {Promise} Promise object
 * @public
 */
```
#### getReportTables
```
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
```
