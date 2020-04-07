const express = require("express");

const routes = express.Router();
const auth = require("./app/middleware/auth");
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");

// Users
routes.get("/users", auth, UserController.index);
routes.get("/users/:id", auth, UserController.show);
routes.post("/users", auth, UserController.store);
routes.put("/users/:id", auth, UserController.update);
routes.delete("/users/:id", auth, UserController.destroy);

// Auth
routes.post("/login", AuthController.login);

module.exports = routes;