// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/api/notes', (req, res) => {
    connection.query('SELECT * FROM Note', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });

  app.post('/api/notes', (req, res) => {
    const { judul } = req.body; // Ambil judul dari body request
  
    // Pastikan judul tidak kosong
    if (!judul) {
      return res.status(400).json({ error: 'Judul catatan diperlukan' });
    }
  
    // Lakukan query untuk menambahkan data baru ke dalam tabel Note
    connection.query('INSERT INTO Note (judul) VALUES (?)', judul, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // Berhasil menambahkan data, kirim respons berhasil
      res.status(201).json({ success: true, message: 'Data berhasil ditambahkan' });
    });
  });

app.get('/api/textnotes/:idnote', (req, res) => {
  const idnote = req.params.idnote; // Ambil idnote dari parameter URL

  // Lakukan query untuk memilih data dari tabel TextNote dengan idnote yang sesuai
  connection.query('SELECT * FROM TextNote WHERE idnote = ?', idnote, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

app.post('/api/textnotes', (req, res) => {
    const { idnote, itemtext } = req.body; // Ambil idnote dan itemtext dari body request
  
    // Pastikan idnote dan itemtext tidak kosong
    if (!idnote || !itemtext) {
      return res.status(400).json({ error: 'idnote dan itemtext diperlukan' });
    }
  
    // Lakukan query untuk menambahkan data baru ke dalam tabel TextNote
    connection.query('INSERT INTO TextNote (idnote, itemtext) VALUES (?, ?)', [idnote, itemtext], (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // Berhasil menambahkan data, kirim respons berhasil
      res.status(201).json({ success: true, message: 'Data berhasil ditambahkan' });
    });
  });

  app.delete('/api/textnotes/:id', (req, res) => {
    const id = req.params.id; // Ambil ID dari parameter URL
  
    // Lakukan query untuk menghapus data dari tabel TextNote berdasarkan ID
    connection.query('DELETE FROM TextNote WHERE id = ?', id, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // Jika data dengan ID yang diberikan ditemukan dan dihapus, kirim respons berhasil
      if (results.affectedRows > 0) {
        res.json({ success: true, message: 'Data berhasil dihapus' });
      } else {
        // Jika data dengan ID yang diberikan tidak ditemukan, kirim respons dengan kode status 404 Not Found
        res.status(404).json({ error: 'Data tidak ditemukan' });
      }
    });
  });
  
  // Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
