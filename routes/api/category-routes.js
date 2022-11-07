const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryData) {
      res.status(404).json({message: "No categories found with that id."});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create({
      category_name: req.body.category_name,

    });
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log("This is body", req.body);
console.log("This is params", req.params);

  // update a category by its `id` value
  try{
    const updateCategoryData = await Category.update(
      //defining the values
      req.body,
    {
      where: {
        category_id: req.params.id,
      }
    });
    res.status(200).json(updateCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategoryData = await Category.destroy ({
      // category_id: req.params.category_id,
      where: {
        category_id: req.params.id,
      },
    });
    if (!deleteCategoryData){
      res.status(400).json({message: "Not found."});
      return;
    }
    res.status(200).json(deleteCategoryData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
