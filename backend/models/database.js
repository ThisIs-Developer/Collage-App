const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '../database.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeTables();
    }
});

function initializeTables() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        google_id TEXT UNIQUE,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, function (err) {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            db.run(`CREATE TABLE IF NOT EXISTS collages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                image_data TEXT,
                layout_config TEXT,
                canvas_size TEXT,
                options TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`, function (err2) {
                if (err2) {
                    console.error('Error creating collages table:', err2.message);
                } else {
                    // Check for admin user only after tables exist
                    db.get("SELECT id FROM users WHERE role = 'admin' LIMIT 1", (err3, row) => {
                        if (err3) {
                            console.error('Error checking admin user:', err3.message);
                        } else if (!row) {
                            console.log('No admin user found. Create one through Google OAuth and manually update the role in database.');
                        }
                    });
                }
            });
        }
    });
}

// User queries
const userQueries = {
    findByGoogleId: (googleId, callback) => {
        db.get("SELECT * FROM users WHERE google_id = ?", [googleId], callback);
    },
    
    findByEmail: (email, callback) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], callback);
    },
    
    findById: (id, callback) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], callback);
    },
    
    create: (userData, callback) => {
        const { googleId, email, name, role = 'user' } = userData;
        db.run("INSERT INTO users (google_id, email, name, role) VALUES (?, ?, ?, ?)", 
               [googleId, email, name, role], function(err) {
                   if (err) {
                       callback(err);
                   } else {
                       callback(null, { id: this.lastID, ...userData });
                   }
               });
    },
    
    updateRole: (userId, role, callback) => {
        db.run("UPDATE users SET role = ? WHERE id = ?", [role, userId], callback);
    }
};

// Collage queries
const collageQueries = {
    findByUserId: (userId, callback) => {
        db.all("SELECT * FROM collages WHERE user_id = ? ORDER BY created_at DESC", [userId], callback);
    },
    
    findAll: (callback) => {
        db.all(`SELECT c.*, u.name as user_name, u.email as user_email 
                FROM collages c 
                JOIN users u ON c.user_id = u.id 
                ORDER BY c.created_at DESC`, callback);
    },
    
    findById: (id, callback) => {
        db.get(`SELECT c.*, u.name as user_name, u.email as user_email 
                FROM collages c 
                JOIN users u ON c.user_id = u.id 
                WHERE c.id = ?`, [id], callback);
    },
    
    create: (collageData, callback) => {
        const { userId, title, description, imageData, layoutConfig, canvasSize, options } = collageData;
        db.run(`INSERT INTO collages (user_id, title, description, image_data, layout_config, canvas_size, options) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, 
               [userId, title, description, imageData, layoutConfig, canvasSize, options], 
               function(err) {
                   if (err) {
                       callback(err);
                   } else {
                       callback(null, { id: this.lastID, ...collageData });
                   }
               });
    },
    
    update: (id, collageData, callback) => {
        const { title, description, imageData, layoutConfig, canvasSize, options } = collageData;
        db.run(`UPDATE collages SET title = ?, description = ?, image_data = ?, 
                layout_config = ?, canvas_size = ?, options = ? WHERE id = ?`, 
               [title, description, imageData, layoutConfig, canvasSize, options, id], callback);
    },
    
    delete: (id, callback) => {
        db.run("DELETE FROM collages WHERE id = ?", [id], callback);
    }
};

module.exports = {
    db,
    userQueries,
    collageQueries
};