const apiResponder = require("../middlewares/apiResponder")
const adminRoutes = require("./admin/index");

module.exports = (app)=>{
    app.use(apiResponder);
    app.use("/admin", adminRoutes);

    return app;
}