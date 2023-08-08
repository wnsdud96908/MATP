var DataTypes = require("sequelize").DataTypes;
var _auth = require("./auth");
var _board = require("./board");
var _board_files = require("./board_files");
var _comment = require("./comment");
var _food_category = require("./food_category");
var _hashtags = require("./hashtags");
var _menu = require("./menu");
var _menu_imgs = require("./menu_imgs");
var _regions = require("./regions");
var _review_imgs = require("./review_imgs");
var _reviews = require("./reviews");
var _stores = require("./stores");
var _user_type = require("./user_type");
var _users = require("./users");
var _wish_list = require("./wish_list");

function initModels(sequelize) {
  var auth = _auth(sequelize, DataTypes);
  var board = _board(sequelize, DataTypes);
  var board_files = _board_files(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var food_category = _food_category(sequelize, DataTypes);
  var hashtags = _hashtags(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var menu_imgs = _menu_imgs(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);
  var review_imgs = _review_imgs(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var stores = _stores(sequelize, DataTypes);
  var user_type = _user_type(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var wish_list = _wish_list(sequelize, DataTypes);

  board_files.belongsTo(board, { as: "board_no_board", foreignKey: "board_no"});
  board.hasMany(board_files, { as: "board_files", foreignKey: "board_no"});
  comment.belongsTo(board, { as: "board_no_board", foreignKey: "board_no"});
  board.hasMany(comment, { as: "comments", foreignKey: "board_no"});
  menu.belongsTo(food_category, { as: "food_ctgr_no_food_category", foreignKey: "food_ctgr_no"});
  food_category.hasMany(menu, { as: "menus", foreignKey: "food_ctgr_no"});
  menu_imgs.belongsTo(menu, { as: "menu_no_menu", foreignKey: "menu_no"});
  menu.hasMany(menu_imgs, { as: "menu_imgs", foreignKey: "menu_no"});
  stores.belongsTo(regions, { as: "rgn_no_region", foreignKey: "rgn_no"});
  regions.hasMany(stores, { as: "stores", foreignKey: "rgn_no"});
  review_imgs.belongsTo(reviews, { as: "review_no_review", foreignKey: "review_no"});
  reviews.hasMany(review_imgs, { as: "review_imgs", foreignKey: "review_no"});
  menu.belongsTo(stores, { as: "store_no_store", foreignKey: "store_no"});
  stores.hasMany(menu, { as: "menus", foreignKey: "store_no"});
  reviews.belongsTo(stores, { as: "store_no_store", foreignKey: "store_no"});
  stores.hasMany(reviews, { as: "reviews", foreignKey: "store_no"});
  wish_list.belongsTo(stores, { as: "store_no_store", foreignKey: "store_no"});
  stores.hasMany(wish_list, { as: "wish_lists", foreignKey: "store_no"});
  users.belongsTo(user_type, { as: "user_type_no_user_type", foreignKey: "user_type_no"});
  user_type.hasMany(users, { as: "users", foreignKey: "user_type_no"});
  board.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(board, { as: "boards", foreignKey: "user_no"});
  comment.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(comment, { as: "comments", foreignKey: "user_no"});
  reviews.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_no"});
  wish_list.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(wish_list, { as: "wish_lists", foreignKey: "user_no"});

  return {
    auth,
    board,
    board_files,
    comment,
    food_category,
    hashtags,
    menu,
    menu_imgs,
    regions,
    review_imgs,
    reviews,
    stores,
    user_type,
    users,
    wish_list,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
