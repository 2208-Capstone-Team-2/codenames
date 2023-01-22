## GET /allPlayers/:roomId/:teamId/:role: Retrieves all players with a specific role on a specific team in a specific room. Pass in the roomId, teamId, and role as parameters in the URL. Returns an array of player objects or a 'no players were found' error.

## GET /allPlayers/:roomId/:teamId: Retrieves all players on a specific team in a specific room. Pass in the roomId and teamId as parameters in the URL. Returns an array of player objects or a 'no players were found' error.

## GET /allPlayers/:roomId: Retrieves all players in a specific room. Pass in the roomId as a parameter in the URL. Returns an array of player objects or a 'no players were found' error.

## GET /allPlayers: Retrieves all players in the database. Returns an array of player objects.

## POST /addPlayerToRoom: Adds a new player to the database and associates them with a specific room. Pass in the playerId, username, and roomId as properties on the req.body. Returns the new player object.

## PUT /update/player/teamAndRole: Updates an existing player's team and role in the database. Pass in the playerId, roomId, teamToJoin, and role as properties on the req.body. Returns the updated player object.

## PUT /remove/player/teamAndRole: Removes a player from a team and sets their role to 'unassigned' in the database. Pass in the playerId and roomId as properties on the req.body. Returns a 'player removed from team and role' message.

PUT /remove/player/room: Removes a player from a room, team, and sets their role to 'unassigned' in the database. Pass in the playerId and roomId as properties on the req.body. Returns a 'player removed from room' message.
