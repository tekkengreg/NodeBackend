const express = require('express');
const router = express.Router();
const JsonDB = require('node-json-db');
const db = new JsonDB("myDataBase", true, true);


/**
 * BEGIN MODIFICATIONS
 */

router.get('/', function (req, res) {
  res.send("Hello World");
});

router.get('/item', function (req, res) {
  const data = db.getData("/item");
  res.send(data);
});

router.get('/item/:id', function (req, res) {
  const data = db.getData(`/item/${req.params.id}`);
  res.send(data);
});

router.post('/item', function (req, res) {
  const id = Date.now();
  try {
    db.push(`/item/${id}`, req.body)
    res.send({ id });
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.put('/item/:id', function (req, res) {
  const id = req.params.id;
  try {
    db.push(`/item/${id}`, req.body)
    res.send({ id });
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.delete('/item/:id', function (req, res) {
  try {
    db.delete(`/item/${req.params.id}`)
    res.end()
  } catch (error) {
    res.status(500).send({ error })
  }
})

/**
 * END MODIFICATIONS
 */


module.exports = router;