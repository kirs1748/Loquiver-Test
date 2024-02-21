const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'loquiver'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { email, username, password } = req.body;

    // Vérifiez que toutes les données nécessaires sont présentes
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs du formulaire' });
    }

    const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    db.query(sql, [email, username, password], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'inscription:', err);
            res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        } else {
            console.log('Utilisateur inscrit avec succès');
            res.json({ message: 'Inscription réussie !' });
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});