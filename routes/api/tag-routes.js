const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!tagData) {
      res.status(404).json({message: "No tags found with that id."});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTagData = await Tag.update(
      //defining the values
      req.body,
    {
      where: {
        tag_id: req.params.id,
      }
    });
    res.status(200).json(updateTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTagData = await Tag.destroy ({
      // category_id: req.params.category_id,
      where: {
        tag_id: req.params.id,
      },
    });
    if (!deleteTagData){
      res.status(400).json({message: "Not found."});
      return;
    }
    res.status(200).json(deleteTagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
