import express, { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { CreateUserSchema } from "../schemas/user.schema";

const router = express.Router();
const userController = new UserController();

router.post("/", validateRequest(CreateUserSchema), (req: Request, res: Response) => userController.createUser(req, res));

router.get("/", (req: Request, res: Response) => userController.getUsers(req, res));
router.delete("/:id", (req: Request, res: Response) => userController.deleteUser(req, res));

export default router;
