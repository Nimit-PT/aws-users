import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { CreateUserDto } from "../schemas/user.schema";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteUser(userId: string) {
    return await this.userRepository.delete(userId);
  }
}
