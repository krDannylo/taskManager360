import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(raw.id, raw.name, raw.email, raw.password, raw.createdAt);
  }
}
