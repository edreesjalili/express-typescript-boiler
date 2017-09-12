import * as passport from 'passport';
import * as bcrypt from 'bcrypt-nodejs';
import * as Promise from 'bluebird';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models';


interface SerializedUser {
	id: number;
	group: number;
}

const compareAsync = Promise.promisify(bcrypt.compare);

const findUser = (username: string): Promise<User> => User.findOne({ where: { username, group: 0 } });

const findAdmin = (username: string): Promise<User> => User.findOne({ where: { username, group: 999 } });

passport.use('user-local', new LocalStrategy((username, password, done) => {
	findUser(username)
		.then((user: User) => {
			// User was not found
			if (!user) {
				done(null, false);
			}
			// compare passwords
			compareAsync(password, user.password)
				.then(isValid => isValid ? done(null, user) : done(null, false))
				.catch(error => done(error));
		})
		.catch(error => done(error));
}));

passport.use('admin-local', new LocalStrategy((username, password, done) => {
	findAdmin(username)
		.then((admin: User) => {
			// Admin was not found
			if (!admin) {
				done(null, false);
			}
			// compare passwords
			compareAsync(password, admin.password)
				.then(isValid => isValid ? done(null, admin) : done(null, false))
				.catch(error => done(error));
		})
		.catch(error => done(error));
}));

passport.serializeUser((user: User, done) => {
	const serializedUser: SerializedUser = {
		id: user.id,
		group: user.group,
	};
	done(null, JSON.stringify(serializedUser));
});

passport.deserializeUser((serializedUser: string, done) => {
	const parsedUser: SerializedUser = JSON.parse(serializedUser);
	User.findById(parsedUser.id)
		.then((retreivedUser: User) => done(null, retreivedUser))
		.catch((error: Error) => done(error));
});
