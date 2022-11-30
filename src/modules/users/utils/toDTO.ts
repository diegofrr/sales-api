import User from '../typeorm/entities/User';

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

export function toDTO(user: User): UserDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || 'default_avatar_url',
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
}
