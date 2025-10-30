import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../infrastructure/repositories/userRepository.js";
import { UserInfoRepository } from "../infrastructure/repositories/userInfoRepository.js";
import type { User } from "../domain/entities/userEntity.js";
import type { UserInfo } from "../domain/entities/userInfoEntity.js";
import { hashPassword } from "../utils/password.js";
import { pool } from "../config/database.js";

export class RegisterUserUseCase {
  private userRepo: UserRepository;
  private userInfoRepo: UserInfoRepository;

  constructor(userRepo?: UserRepository, userInfoRepo?: UserInfoRepository) {
    this.userRepo = userRepo ?? new UserRepository();
    this.userInfoRepo = userInfoRepo ?? new UserInfoRepository();
  }

  async execute( inputUser: Pick<User, "email" | "password">, inputUserInfo: Pick<UserInfo, "first_name" | "last_name">) {
    const client = await pool.connect(); 
    try {
      await client.query("BEGIN");

      const passwordHash = await hashPassword(inputUser.password);

      const newUser: User = {
        id: uuidv4(),
        email: inputUser.email,
        password: passwordHash,
        created_at: new Date(),
      };

      const newUserInfo: UserInfo = {
        id: uuidv4(),
        user_id: newUser.id,
        first_name: inputUserInfo.first_name,
        last_name: inputUserInfo.last_name,
        created_at: new Date(),
      };

      const created = await this.userRepo.create(newUser, client);
      await this.userInfoRepo.create(newUserInfo, client);
      await client.query("COMMIT");
      return created;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}
