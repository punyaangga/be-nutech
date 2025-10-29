import { UserRepository } from "../infrastructure/repositories/userRepository.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export class LoginUserUseCase {
  private userRepo: UserRepository;

  constructor(userRepo?: UserRepository) {
    this.userRepo = userRepo ?? new UserRepository();
  }

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    const token = generateToken({ id: user.id, email: user.email });

    return {
      token,
    };
  }
}
