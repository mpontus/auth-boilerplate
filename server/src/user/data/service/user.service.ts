import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Pagination } from '../interface/pagination.interface';
import { ProfileUpdate } from '../interface/profile-update.interface';

/**
 * User service
 *
 * Access and modify user records
 */
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Return list of users
   */
  public async listUsers(
    actor: User,
    offset: number,
    limit: number,
  ): Promise<Pagination<User>> {
    if (!actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    return {
      total: await this.userRepository.count(),
      items: await this.userRepository.find({
        skip: offset,
        take: limit,
      }),
    };
  }

  /**
   * Return single user by id
   */
  public async getUser(actor: User, id: string): Promise<User> {
    if (actor.id !== id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  /**
   * Modify user
   *
   * When user updates their own profile they must specify current
   * password in order to change password or email address.
   */
  public async updateUser(
    actor: User,
    id: string,
    update: ProfileUpdate,
  ): Promise<User> {
    if (actor.id !== id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    // User needs to specify their current password to update password or email
    const currentPasswordValid =
      actor.roles.includes('admin') ||
      (update.currentPassword !== undefined &&
        (await bcrypt.compare(update.currentPassword, user.passwordHash)));

    if (
      !currentPasswordValid &&
      (update.password !== undefined || update.email !== undefined)
    ) {
      throw new BadRequestException('Current password does not match');
    }

    if (update.name !== undefined) {
      user.name = update.name;
    }

    if (update.password !== undefined) {
      user.passwordHash = await bcrypt.hash(update.password, 10);
    }

    if (update.email !== undefined && user.email !== update.email) {
      user.email = update.email;
      user.emailVerified = false;
    }

    await this.userRepository.save(user);

    return user;
  }

  /**
   * Delete a user
   */
  public async deleteUser(actor: User, id: string): Promise<void> {
    if (actor.id !== id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    await this.userRepository.remove(user);
  }

  /**
   * Change user roles
   */
  public async toggleUserRole(
    actor: User,
    id: string,
    role: string,
    delta: number,
  ): Promise<void> {
    if (!actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    if (delta < 0 && user.roles.includes(role)) {
      // tslint:disable-next-line:typedef
      const notEqual = <T>(value: T) => (other: T): boolean => value !== other;

      user.roles = user.roles.filter(notEqual(role));
    }

    if (delta > 0 && !user.roles.includes(role)) {
      user.roles = [...user.roles, role];
    }

    await this.userRepository.save(user);
  }

  /**
   * Assign a profile association to a social network
   */
  public async attachProvider(
    actor: User,
    id: string,
    _provider: string,
    _code: string,
  ): Promise<void> {
    if (actor.id !== id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    throw new Error('Not implemented');
  }

  /**
   * Delete profile association with a social network
   */
  public async detachProvider(
    actor: User,
    id: string,
    _provider: string,
  ): Promise<void> {
    if (actor.id !== id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    throw new Error('Not implemented');
  }
}
