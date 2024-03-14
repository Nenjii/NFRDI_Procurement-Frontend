const express = require('express');
const multer  = require('multer'); // for handling file uploads
const upload = multer({ dest: 'uploads/' }); // specify where to temporarily store files
const app = express();

// Endpoint for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Assuming you have a database connection named "db"
  const { file } = req;
  // Save file to database using your preferred database library (e.g., mysql, pg)
  db.query('INSERT INTO your_table (file_data) VALUES (?)', [file.buffer], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error uploading file' });
    } else {
      res.status(200).json({ message: 'File uploaded successfully' });
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
