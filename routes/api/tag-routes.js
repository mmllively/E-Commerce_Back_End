const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((tagData)=> {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id).then((tagData)=> {
    res.json(tagData);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  //ask question about this part
  Tag.create(req.body)
  .then((product) => {


  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update (
    {
      product_id: req.body.tag_id,
    },
    {
      where: {
        tag_id: req.params.category_id,
      }
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
tag_id: req.params.tag_id,
    },
  })
  .catch((err) => res.json(err))
});

module.exports = router;
