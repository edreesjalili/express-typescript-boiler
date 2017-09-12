import {
	Table,
	Column,
	Model,
	HasMany,
	Length,
	DataType,
	IsEmail,
	PrimaryKey,
	AllowNull,
	Unique,
	AutoIncrement,
	ForeignKey,
} from 'sequelize-typescript';

import {
	hash,
} from 'bcrypt-nodejs';

import {
	salt,
} from '../config';

import {
	Group,
} from './';

@Table
class User extends Model < User > {

	@Unique
	@PrimaryKey
	@AutoIncrement
	id: number;

	@Length({	max: 30 })
	@AllowNull(false)
	@Column
	firstName: string;

	@Length({	max: 30	})
	@AllowNull(false)
	@Column
	lastName: string;


	@Length({	max: 50 })
	@IsEmail
	@AllowNull(false)
	@Unique
	@Column
	email: string;


	@Length({ max: 30 })
	@Column({ type: DataType.CHAR(60)	})
	password: string;
	
	@ForeignKey(() => Group)
	@Column
	group: number;

}

User.beforeCreate((user: User, options) => {
	return hashPassword(user.password).then(hashed => user.password = hashed);
});

function hashPassword(password: string): Promise<string> {
	return new Promise<string>((resolve, reject) => hash(password, salt, (error, result) => error ? reject(error) : resolve(result)));
}

export default User;
