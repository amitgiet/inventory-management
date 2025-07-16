const apiResponder = require("../middlewares/apiResponder")
const authRoutes = require("./admin/index");

module.exports = (app)=>{
    app.use(apiResponder);
    app.use("/admin", authRoutes);

    return app;
}