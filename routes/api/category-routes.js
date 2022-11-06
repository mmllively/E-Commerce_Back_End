const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then((categoryData)=> {
    res.json(categoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    shirts: req.body.shirts,
    shorts: req.body.shorts,
    music: req.body.music,
    hats: req.body.hats,
    shoes: req.body.shoes,
  })
  .then((newCategory) =>{
    res.json(newCategory);
  })
  .catch((err)=> {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_id: req.body.category_id,
      shirts: req.body.shirts,
      shorts: req.body.shorts,
      music: req.body.music,
      hats: req.body.hats,
      shoes: req.body.shoes,

    },
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
  .catch((err) => res.json(err));
});

module.exports = router;
