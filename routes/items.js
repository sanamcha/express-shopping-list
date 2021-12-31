const SampleItem = require('../sampleItem');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    return res.json({ items: SampleItem.findAll() });
  } catch(err){
    return next(err)
  }
});


router.post('/', (req, res, next) => {
  try {
    let newItem = new SampleItem(req.body.name, req.body.price);
    return res.json({item: newItem});
  } catch (err) {
    return next(err)
  }
});



router.get('/:name', (req, res, next) => {
  try {
    let foundItem = SampleItem.find(req.params.name);
    return res.json({item:foundItem});
  } catch(err){
    return next(err)
  }
});



router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = SampleItem.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});


router.delete('/:name', (req, res, next) => {
  try {
    SampleItem.remove(req.params.name);
    return res.json({message:'Deleted'});
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
