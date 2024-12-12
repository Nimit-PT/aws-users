import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Creation failed",
      });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Fetch failed",
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id; // Assuming the user ID is passed in the URL parameters
      const deletedUser = await this.userService.deleteUser(userId);

      if (deletedUser) {
        res.status(200).json({
          message: "User deleted successfully",
          user: deletedUser,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Deletion failed",
      });
    }
  };
}
