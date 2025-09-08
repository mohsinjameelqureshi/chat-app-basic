import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getUserForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-passworrd -refreshToken"
    );

    res
      .status(200)
      .json(new ApiResponse(200, allUsers, "All user from db except me"));
  } catch (error) {
    console.error("Error in getUserForSidebar: ", error.message);
    throw new ApiError(500, "Internal server Error.");
  }
});

export { getUserForSidebar };
