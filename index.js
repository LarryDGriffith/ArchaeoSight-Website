const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve static files if they exist or redirect to index.html
app.get('*', (req, res) => {
    if (!path.extname(req.path)) {
        const indexPath = path.join(__dirname, 'public', req.path, 'index.html');
        console.log(indexPath);
        res.sendFile(indexPath, (err) => {
            if (err) {
                res.status(404).send('Page not found');
            }
        });
    } else {
        const filePath = path.join(__dirname, 'public', req.path);
        console.log(filePath);
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(404).send('Page not found');
            }
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});