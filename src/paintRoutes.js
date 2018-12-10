const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/colors', (req, res)=>{
    db.all('SELECT * FROM primitive_color', (err, rows)=>{
        res.json(rows);
    })
})

router.get('/shapes', (req, res)=>{
    db.all('SELECT * FROM primitive_shape', (err, rows)=>{
        res.json(rows);
    })
})

router.get('/drawing/:id', (req, res)=>{
    db.all(`SELECT d.name, ps.display_name, pc.display_name, pc.code, f.size, f.x, f.y, f.orientation FROM drawing as d
        INNER JOIN form as f ON d.id = f.drawing_id
        INNER JOIN primitive_shape AS ps ON ps.id =	 f.primitive_shape_id
        INNER JOIN primitive_color AS pc ON pc.id = f.primitive_color_id
        WHERE d.id=?`,[req.params.id]
        , (err, rows)=>{
        res.json(rows);
    })
})


module.exports = router;