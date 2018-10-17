import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { Repository } from "typeorm";
import { User } from "../../data/entity/User.entity";

@ValidatorConstraint({ name: "isUserAlreadyExist", async: true })
@Injectable()
export class IsEmailUnique {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async validate(email: string) {
    const userExists = await this.userRepository.findOne({ email });

    return !userExists;
  }

  public defaultMessage(_args: ValidationArguments) {
    return "User with this email already exists.";
  }
}
