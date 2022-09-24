const express = require("express");
const {
  register,
  login,
  activateAccount,
  resendVerification,
  findUser,
  searchUser,
  isIncluded,
  deleteFriendRequest,
  unfriend,
  acceptFriendRequest,
  unfollow,
  follow,
  cancelFriendRequest,
  sendFriendRequest,
  updateUserDetails,
  updateCoverPicture,
  updateProfilePicture,
  getProfile,
  changePassword,
  verifyCode,
  FetchUsers,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/activate", activateAccount);
router.post("/users/sendResetPasswordCode", resendVerification);
router.post("/users/findUser", auth, findUser);
router.get("/users/", auth, FetchUsers);

router.post("/users/verifyCode", auth, verifyCode);
router.post("/users/changePassword", auth, changePassword);
router.get("/profile/:username", auth, getProfile);
router.put("/profile/picture/update", auth, updateProfilePicture);
router.put("/profile/cover/update", auth, updateCoverPicture);
router.put("/profile/details/update", auth, updateUserDetails);
router.put("/profile/sendRequest/:id", auth, sendFriendRequest);
router.put("/profile/cancelRequest/:id", auth, cancelFriendRequest);
router.put("/profile/follow/:id", auth, follow);
router.put("/profile/unfollow/:id", auth, unfollow);
router.put("/profile/acceptRequest/:id", auth, acceptFriendRequest);
router.put("/profile/unfriend/:id", auth, unfriend);
router.put("/profile/deleteRequest/:id", auth, deleteFriendRequest);
router.get("/check/:postId", auth, isIncluded);
router.post("/searchUser/:searchTerm", auth, searchUser);
module.exports = router;
