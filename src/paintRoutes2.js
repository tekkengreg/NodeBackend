const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/shapes',(req,res)=>{
    db.all('SELECT * FROM primitive_shape',
    (err, rows)=>{
        if(err) res.status(500).send(err)
        res.json(rows)
    })
})

router.get('/colors',(req,res)=>{
    db.all('SELECT * FROM primitive_color',
    (err, rows)=>{
        if(err) res.status(500).send(err)
        res.json(rows)
    })
})

router.get('/drawing/:id',(req,res)=>{
    db.all(`SELECT 
        d.id as drawing_id,
        d.name as drawing_name,
        d.owner,
        f.size,
        f.x,
        f.y,
        f.orientation,
        ps.display_name as ps_name,
        ps.name,
        pc.display_name as pc_name,
        pc.code
    FROM drawing as d
    INNER JOIN form as f ON f.drawing_id=d.id
    INNER JOIN primitive_shape as ps ON f.primitive_shape_id=ps.id
    INNER JOIN primitive_color as pc ON f.primitive_color_id=pc.id
    WHERE d.id=? 
    `,[req.params.id],
    (err, rows)=>{
        if(err) res.status(500).send(err)
        res.json(rows)
    })
})

module.exports = router;