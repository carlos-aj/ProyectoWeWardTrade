import { Model } from 'objection';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  email_confirmed?: boolean;
  email_confirmation_token?: string;
  email_confirmation_sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  password_reset_token?: string;
  password_reset_sent_at?: Date;
}

export class User extends Model implements IUser {
  id?: number;
  name!: string;
  email!: string;
  password!: string;
  email_confirmed?: boolean;
  email_confirmation_token?: string;
  email_confirmation_sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  password_reset_token?: string;
  password_reset_sent_at?: Date;

  static tableName = 'users';
}