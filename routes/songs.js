const express = require('express');
const Song = require('../models/Song');
const { connectToDB } = require("../utils/database");
const router = express.Router();

// Create a new song
router.post('/', async (req, res) => {
  const { title ,artist ,album ,genre ,image } = await req.body;
  console.log(req.body)
  try {
    await connectToDB()
    const song = new Song({title ,artist ,album ,genre ,image});
    await song.save();
    res.status(201).send(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all songs
router.get('/', async (req, res) => {
  try {
    console.log("get")
    await connectToDB()
    const songs = await Song.find();
    console.log(songs)
    res.status(200).send(songs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a song by ID
router.get('/:id', async (req, res) => {
  try {
    await connectToDB()
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send();
    res.status(200).send(song);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a song by ID
router.put('/:id', async (req, res) => {
  try {
    await connectToDB()
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!song) return res.status(404).send();
    res.status(200).send(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a song by ID
router.delete('/:id', async (req, res) => {
  try {
    await connectToDB()
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).send();
    res.status(200).send(song);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    await connectToDB()
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').then(artists => artists.length);
    const totalAlbums = await Song.distinct('album').then(albums => albums.length);
    const totalGenres = await Song.distinct('genre').then(genres => genres.length);

    const songsByGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);

    const songsByArtist = await Song.aggregate([
      { $group: { _id: '$artist', songs: { $sum: 1 }, albums: { $addToSet: '$album' } } },
    ]);

    res.status(200).send({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
