import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { OPTIONS } from "../contant.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and referesh token"
    );
  }
};

const singup = asyncHandler(async (req, res) => {
  // Avatar Placeholder ==> https://avatar-placeholder.iran.liara.run
  // Male Avatar Placeholder ==> https://avatar.iran.liara.run/public/boy?username=Scott
  // Female Avater Placehoder ==> https://avatar.iran.liara.run/public/girl?username=Maria

  const { fullname, username, password, confirmPassword, gender } = req.body;

  // validation
  if (
    [fullname, username, password, confirmPassword, gender].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // match password with confirm password
  if (password !== confirmPassword) {
    throw new ApiError(400, `Password didn't matched.`);
  }

  // check if username already exists in Databse
  const existedUser = await User.findOne({ username: username });
  if (existedUser) {
    throw new ApiError(409, "username already existed.");
  }

  // Avatar Placeolder
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  try {
    const user = await User.create({
      fullname,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const safeUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res
      .status(201)
      .cookie("accessToken", accessToken, OPTIONS)
      .cookie("refreshToken", refreshToken, OPTIONS)
      .json(new ApiResponse(201, { user: safeUser, accessToken }, "success"));
  } catch (error) {
    console.error("Error while creating user", error.message);
    throw new ApiError(500, "Something went wrong while creating user.");
  }
});
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // validation
  if (!username || !password) {
    throw new ApiError(400, "All Fields Required.");
  }

  // checking if user existe
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new ApiError(404, "User didn't exists.");
  }

  // validate password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(400, "Error while logging in user.");
  }

  console.log(loggedInUser);

  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in"
      )
    );
});
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", OPTIONS)
    .clearCookie("refreshToken", OPTIONS)
    .json(new ApiResponse(200, {}, "User is logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required.");
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token.User not found.");
    }

    if (String(incomingRefreshToken) !== String(user?.refreshToken)) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user?._id);

    res
      .status(200)
      .cookie("accessToken", accessToken, OPTIONS)
      .cookie("refreshToken", newRefreshToken, OPTIONS)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while refreshing access token"
    );
  }
});

export { singup, login, logout, refreshAccessToken };
