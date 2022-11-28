import { compare } from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

export interface UserDTO {
    name: string;
    email: string;
    avatar: string;
}

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                name,
            },
        });
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });
        return user;
    }

    public async toDTO(user: User): Promise<UserDTO> {
        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar || 'default_avatar_url',
        };
    }

    public async checkPassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}
