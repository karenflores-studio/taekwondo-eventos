
import { Router } from "express"
import * as usersController from "../controllers/users.controller.js"
import { validateUser } from "../../middlewares/users.validate.js"

const router = Router()

router.post("/api/users", validateUser, usersController.saveUser)
router.post("/api/login", usersController.loginUser)

export default router
