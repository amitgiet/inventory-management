const router = require('express').Router()

const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const productCategoryRoutes = require('./productCategoriesRoutes')

router.use(authRoutes)
router.use('/product',productRoutes)
router.use('/category',productCategoryRoutes)

module.exports = router;
