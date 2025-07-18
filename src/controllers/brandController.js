const slugify = require("slugify");
const { Brand } = require("../models");
const { Op } = require("sequelize");

/* 
  @ApiPath: /brands
  @Method: POST
  @Params: { 
    brand_name: "string", 
    brand_slug: "string (optional)",
    is_active: "boolean (optional)"
  }
  @Description: This API creates a new brand.
  @Access: Public
*/
const createBrand = async (req, res) => {
  try {
    const { brand_name, brand_slug, is_active } = req.body;

    if (!brand_name) {
      return res.apiError("Brand name is required", 422);
    }

    const slug =
      brand_slug || slugify(brand_name, { lower: true, strict: true });

    const brand = await Brand.create({
      brand_name,
      brand_slug: slug,
      is_active,
    });

    res.apiSuccess("Brand created successfully", brand);
  } catch (error) {
    res.apiError("Internal server error", 500, error);
  }
};

/* 
  @ApiPath: /brands
  @Method: GET
  @Params: none
  @Description: Fetch all brands.
  @Access: Public
*/
const getAllBrands = async (req, res) => {
  try {
    const { search } = req.query;
    let where = {};
    if (search) {
      where = {
        brand_name: { [Op.like]: `%${search}%` },
      };
    }
    const brands = await Brand.findAll({ where });
    res.apiSuccess("Brands fetched successfully", brands);
  } catch (error) {
    res.apiError("Internal server error", 500, error);
  }
};

/* 
  @ApiPath: /brands/:id
  @Method: GET
  @Params: { id: "Brand ID" }
  @Description: Fetch a single brand by ID.
  @Access: Public
*/
const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) {
      return res.apiError("Brand not found", 404);
    }
    res.apiSuccess("Brand fetched successfully", brand);
  } catch (error) {
    res.apiError("Internal server error", 500, error);
  }
};

/* 
  @ApiPath: /brands/:id
  @Method: PUT
  @Params: { 
    id: "Brand ID",
    brand_name: "string", 
    brand_slug: "string (optional)",
    is_active: "boolean (optional)"
  }
  @Description: Update an existing brand by ID.
  @Access: Public
*/
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) {
      return res.apiError("Brand not found", 404);
    }

    const { brand_name, brand_slug, is_active } = req.body;

    const updatedSlug =
      brand_slug ||
      (brand_name
        ? slugify(brand_name, { lower: true, strict: true })
        : brand.brand_slug);

    await brand.update({
      brand_name: brand_name ?? brand.brand_name,
      brand_slug: updatedSlug,
      is_active: is_active ?? brand.is_active,
    });

    res.apiSuccess("Brand updated successfully", brand);
  } catch (error) {
    res.apiError("Internal server error", 500, error);
  }
};

/* 
  @ApiPath: /brands/:id
  @Method: DELETE
  @Params: { id: "Brand ID" }
  @Description: Delete a brand by ID.
  @Access: Public
*/
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) {
      return res.apiError("Brand not found", 404);
    }

    await brand.destroy();
    res.apiSuccess("Brand deleted successfully");
  } catch (error) {
    res.apiError("Internal server error", 500, error);
  }
};

module.exports = {
  deleteBrand,
  updateBrand,
  getBrandById,
  getAllBrands,
  createBrand,
};
