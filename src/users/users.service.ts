import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  remove(id: number) {
    return this.userRepository.delete({ id });
  }
  findOne(id: number) {
    return this.userRepository.findOneBy({ id });;
  }
  findAll() {
    return this.userRepository.find();;
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async create(createUserDto: CreateUserDto) {
    const randomTag = Math.floor(Math.random() * 10000);

    const displayName = `${createUserDto.displayname}#${randomTag}`;

    // gen salt
    const salt = await bcrypt.genSalt();

    // enc password
    const encPassword = await bcrypt.hash(createUserDto.password, salt)

    // replace password with encPassword
    const userWithEncPassword = {...createUserDto, password: encPassword,displayname:displayName };

    // saved
    const savedUser = await this.userRepository.save(userWithEncPassword);

    // spread password filed from savedUser
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = savedUser;

    // return user without password filed
    return userWithoutPassword;

  }

  async findOneByUsername(username: string): Promise<User> {
    if (!username) {
      return null
    }
    return this.userRepository.findOneBy({ username })
  }
  update(id: number, updateUserDto:UpdateUserDto) {
    return this.userRepository.save({
      id, ...updateUserDto
    })
  }

}
