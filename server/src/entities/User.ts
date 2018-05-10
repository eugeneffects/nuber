import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { IsEmail } from "class-validator";
import bcrypt, { hash } from "bcrypt";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "bigint", nullable: true })
  facebookId: number;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text", enum: ["facebook", "email"], default: "email" })
  loginType: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hashPassword(password: string = ""): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  @BeforeInsert()
  async savePassword(): Promise<void> {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;
  }
}
export default User;