A RESTful API built with Express.js and MongoDB for managing a music library. The API supports CRUD operations for songs and provides statistics on the collection, including total songs, distinct artists, albums, genres, and more.

Endpoints:

POST /songs: Add a new song.

GET /songs: Retrieve all songs.

GET /songs/stats: Get music collection statistics.

GET /songs/:id: Retrieve a specific song by its ID.

PUT /songs/:id: Update a song by its ID.

DELETE /songs/:id: Delete a song by its ID.
 
