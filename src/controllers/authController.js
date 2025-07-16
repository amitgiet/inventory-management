const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("validatorjs");
const { user, Permission } = require("../models");
const constants = require("../config/constant");

/*AdminsUser Login API
  @Apipath: /login
  @Method: POST
  @Params : { 
    AdminsUsername : "AdminsUserdemo", 
    password : "********"
  } 
  @Description: This API is used for AdminsUser Login
  @Access: Public
*/
const login = async (req, res) => {
  const { email, password } = req.body;

  const validation = new Validator(
    { email, password },
    {
      email: "required|email",
      password: "required",
    },
    {
      "required.email": "The email field is required!",
      "email.email": "The email format is invalid!",
    }
  );

  if (validation.fails()) {
    const [firstError] = Object.values(validation.errors.all()).flat();
    return res.apiError(firstError, 422);
  }

  try {
    // Step 2: Find the AdminsUser
    const userDetails = await user.findOne({ where: { email } });

    if (!userDetails) {
      return res.apiError("The AdminsUser credentials are not found.", 404);
    }

    if (userDetails.isActive === false) {
      return res.apiError(
        "Your account has been deactivated. Please contact the administrator.",
        403
      );
    }

    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return res.apiError("Incorrect password.", 401);
    }
    const permissions = await Permission.findOne({
      where: { id: userDetails.permission_id },
    });

    userDetails.password = undefined;
    
    const accessToken = jwt.sign(
      {
        id: userDetails.id,
        email: userDetails.email,
      },
      constants.JWTSECRET,
      { expiresIn: "4h" }
    );

    const refreshToken = jwt.sign(
      {
        id: userDetails.id,
        email: userDetails.email,
      },
      constants.ACCESS_TOKEN_SECRET,
      { expiresIn: "4h" }
    );
    
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 14400000, 
      })
      .json({
        userDetails: {
          ...userDetails.dataValues,
          permissions:permissions.dataValues,
        },
        accessToken,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.apiError("Internal server error", 500, error);
  }
};

/*User Login API
  @Apipath: web/logout
  @Method: GET
  @Params : {} 
  @Description: This API is used for logging out user, NEED TO CLEAR COOKIE STORED IN BROWSER
  @Access: Public
*/
const logout = (req, res) => {
  return res
    .clearCookie(req.body.type, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send({ status: true, message: "Logout successful" });
};


module.exports = {
  login,
  logout,
};
