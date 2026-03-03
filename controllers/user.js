import userServices from "../services/user.js";

export const signUpUser = async (req, res, next) => {
  try {
    let {username, email, password} = req.body;
    let params = {};
    params.username =username;
    params.email = email;
    params.password = password;

    const response = await userServices.signup(params);
    res.status(200).json({
      success: true,
      message: "signed up successfully",
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let {email, password} = req.body;
    let params = {};
    params.email = email;
    params.password = password;

    const response = await userServices.login(params);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: response
    });
  } catch (error) {
    next(error);
  }
};