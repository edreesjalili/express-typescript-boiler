import * as passport from 'passport';
import * as bcrypt from 'bcrypt-nodejs';
import * as Promise from 'bluebird';
import { Strategy as LocalStrategy } from 'passport-local';


interface SerializedUser {
	id: string;
	group: string;
}

const compareAsync = Promise.promisify(bcrypt.compare);

/**
 * TODO: Implement findUser & findAdmin
 */
const findUser = (username: string): Promise<any> => new Promise((resolve, reject) => {});
const findAdmin = (username: string): Promise<any> => new Promise((resolve, reject) => {});

passport.use('user-local', new LocalStrategy((username, password, done) => {
	findUser(username)
		.then((user) => {
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
		.then((admin) => {
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

passport.serializeUser((user: any, done) => {
	const serializedUser: SerializedUser = {
		id: user._id,
		group: user.group,
	};
	done(null, JSON.stringify(serializedUser));
});
passport.deserializeUser((serializedUser: string, done) => {
	const parsedUser: SerializedUser = JSON.parse(serializedUser);
	if (parsedUser.group === 'admin') {
		// TODO Find admin by id
	} else if (parsedUser.group === 'user') {
		// TODO find user by id
	}
});
