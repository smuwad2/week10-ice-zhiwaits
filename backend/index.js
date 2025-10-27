const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./blog.db');
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Server is up');
});

app.get('/addPost', async (req, res) => {
    console.log('Received request to add post:', req.query);
    const { subject, entry, mood } = req.query;
    db.run("INSERT INTO post (subject, entry, mood, create_timestamp, update_timestamp) VALUES (?, ?, ?, datetime('now'), datetime('now'))", subject, entry, mood, function(err) {
        if (err) {
            console.error('Error adding post:', err);
            res.status(500).json({ error: 'Failed to add post' });
        } else {
            console.log('Post added successfully');
            res.status(200).json({ message: 'Post added successfully' });
        }
    });
});

app.post('/addPost', async (req, res) => {
    console.log('Received request to add post:');
    const { subject, entry, mood } = req.body;
    db.run("INSERT INTO post (subject, entry, mood, create_timestamp, update_timestamp) VALUES (?, ?, ?, datetime('now'), datetime('now'))", subject, entry, mood, function(err) {
        if (err) {
            console.error('Error adding post:', err);
            res.status(500).json({ error: 'Failed to add post' });
        } else {
            console.log('Post added successfully');
            res.status(200).json({ message: 'Post added successfully' });
        }
    });
});

app.get('/deletePost', async (req, res) => {
    console.log('Received request to delete post with id:', req.query.id);
    const { subject, entry, mood } = req.query;
    db.run("DELETE from post where id=?", req.query.id, function(err) {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).json({ error: 'Failed to delete post' });
        } else {
            console.log('Post deleted successfully');
            res.status(200).json({ message: 'Post deleted successfully' });
        }
    });
});

app.post('/updatePost', async (req, res) => {
    console.log('Received request to update post with id:', req.query.id);
    const { entry, mood } = req.body;
    db.run("UPDATE post SET entry = ?, mood = ?, update_timestamp = datetime('now') WHERE id = ?", [entry, mood, req.query.id], function(err) {
        if (err) { 
            console.error('Error updating post:', err);
            res.status(500).json({ error: 'Failed to update post' });
        } else {
            console.log('Post updated successfully');
            res.status(200).json({ message: 'Post updated successfully' });
        }
    });
});

app.get('/posts', async (_, res) => {
    db.all(`SELECT * FROM post ORDER BY create_timestamp DESC`, (err,rows) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).json({ error: 'Failed to fetch posts' });
        } else {
            res.json(rows);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});
