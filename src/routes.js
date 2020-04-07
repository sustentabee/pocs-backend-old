const express = require("express");

const routes = express.Router();
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");

// Users
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

// Auth
routes.post("/login", AuthController.login);

module.exports = routes;