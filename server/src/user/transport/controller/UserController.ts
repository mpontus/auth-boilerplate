import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User as UserEntity } from '../../data/entity/User.entity';
import { UserService } from '../../data/service/UserService';
import { AuthGuard } from '../guards/AuthGuard';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';
import { User } from '../serializer/User';
import { UserPagination } from '../serializer/UserPagination';
import { PaginationDto } from '../validator/PaginationDto';
import { ProfileUpdateDto } from '../validator/ProfileUpdateDto';

/**
 * User Controller
 *
 * Provides general access to user records.
 */
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  /**
   * Return list of users
   */
  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(new TransformInterceptor(UserPagination))
  public async listUsers(
    @Req() req: { user: UserEntity },
    @Query() { skip = 0, take = 10 }: PaginationDto,
  ): Promise<UserPagination> {
    return this.userService.listUsers(req.user, skip, take);
  }

  /**
   * Return single user by id
   */
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(new TransformInterceptor(User))
  public async getUser(
    @Req() req: { user: UserEntity },
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.getUser(req.user, id);
  }

  /**
   * Update user by id
   */
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(new TransformInterceptor(User))
  public async updateUser(
    @Req() req: { user: UserEntity },
    @Param('id') id: string,
    @Body() update: ProfileUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(req.user, id, update);
  }

  /**
   * Delete user by id
   */
  @Delete(':id')
  @UseGuards(AuthGuard)
  public async deleteUser(
    @Req() req: { user: UserEntity },
    @Param('id') id: string,
  ): Promise<void> {
    return this.userService.deleteUser(req.user, id);
  }

  /**
   * Attach role to the user
   */
  @Put(':id/roles/:role')
  @UseGuards(AuthGuard)
  public async attachRole(
    @Req() req: { user: UserEntity },
    @Param('id') id: string,
    @Param('role') role: string,
  ): Promise<void> {
    return this.userService.toggleUserRole(req.user, id, role, +1);
  }

  /**
   * Remove role from the user
   */
  @Delete(':id/roles/:role')
  @UseGuards(AuthGuard)
  public async removeRole(
    @Req() req: { user: UserEntity },
    @Param('id') id: string,
    @Param('role') role: string,
  ): Promise<void> {
    return this.userService.toggleUserRole(req.user, id, role, -1);
  }
}
