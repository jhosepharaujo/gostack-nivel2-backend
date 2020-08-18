import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string {
        return this.avatar
            ? `${process.env.APP_API_URL}/files/${this.avatar}`
            : 'https://img1.gratispng.com/20180319/epw/kisspng-india-login-computer-icons-emoticon-medicine-user-login-icon-5ab05c8bc2f8d1.4479395815215074677986.jpg';
    }
}

export default User;
