import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { mysql } from '../config';
import * as path from 'path';

const options: ISequelizeConfig = {
	name: mysql.database,
	host: mysql.host,
	dialect: 'mysql',
	username: mysql.username,
	password: mysql.password,
	pool: {
		max: 30,
		min: 0,
		idle: 10000,
	},
	modelPaths: [path.join(__dirname + './models')],
};

const sequelize = new Sequelize(options);

export default sequelize;
