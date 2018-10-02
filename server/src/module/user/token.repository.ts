import * as hat from 'hat';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, MoreThan } from 'typeorm';
import { TokenEntity } from './token.entity';
import { CreateTokenDto } from './domain/model/CreateTokenDto';
import { ClaimTokenDto } from './domain/model/ClaimTokenDto';
import { Token } from './domain/model/Token';

export class TokenRepository {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async create({ permission, expires }: CreateTokenDto): Promise<Token> {
    const tokenEntity = this.entityManager.create(TokenEntity, {
      permission,
      secret: hat(),
      expires,
    });

    await this.entityManager.save(tokenEntity);

    return new Token(tokenEntity);
  }

  public async verify({ secret, permission }: ClaimTokenDto): Promise<boolean> {
    const count = await this.entityManager.count(TokenEntity, {
      secret,
      permission,
      expires: MoreThan(Date.now()),
    });

    return count > 0;
  }

  public async claim({ secret, permission }: ClaimTokenDto): Promise<boolean> {
    if (!(await this.verify({ secret, permission }))) {
      return false;
    }

    const count = await this.entityManager.delete(TokenEntity, {
      secret,
      permission,
    });

    return true;
  }
}
