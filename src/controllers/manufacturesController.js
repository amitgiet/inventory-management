const { Manufacturer } = require('../models');

/*
  @ApiPath: /manufacturers
  @Method: POST
  @Params: {
    manufacturer_name: "string",
    status: boolean (optional, defaults to true)
  }
  @Description: Create a new manufacturer
  @Access: Public
*/
exports.createManufacturer = async (req, res) => {
  try {
    const { manufacturer_name, status } = req.body;
    if (!manufacturer_name) {
      return res.status(422).json({ success: false, message: "Manufacturer name is required" });
    }

    const manufacturer = await Manufacturer.create({
      manufacturer_name,
      status: status !== undefined ? status : true,
    });

    res.status(201).json({ success: true, message: "Manufacturer created", data: manufacturer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufacturers
  @Method: GET
  @Description: Get all manufacturers
  @Access: Public
*/
exports.getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.findAll();
    res.json({ success: true, data: manufacturers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufacturers/:id 
  @Method: GET
  @Params: { id: "manufacturer ID" }
  @Description: Get manufacturer by ID
  @Access: Public
*/
exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByPk(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }
    res.json({ success: true, data: manufacturer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufacturers/:id
  @Method: PUT
  @Params: {
    manufacturer_name: "string",
    status: boolean
  }
  @Description: Update manufacturer by ID
  @Access: Public
*/
exports.updateManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByPk(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    const { manufacturer_name, status } = req.body;
    await manufacturer.update({
      manufacturer_name: manufacturer_name ?? manufacturer.manufacturer_name,
      status: status !== undefined ? status : manufacturer.status,
    });

    res.json({ success: true, message: "Manufacturer updated", data: manufacturer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
  @ApiPath: /manufacturers/:id
  @Method: DELETE
  @Params: { id: "manufacturer ID" }
  @Description: Delete manufacturer by ID
  @Access: Public
*/
exports.deleteManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByPk(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    await manufacturer.destroy();
    res.json({ success: true, message: "Manufacturer deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
