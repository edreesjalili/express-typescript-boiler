import * as express from 'express';
import * as passport from 'passport';
import * as compression from 'compression';
import * as session from 'express-session';
import * as redis from 'connect-redis';
import * as config from './config/index';

const app: express.Application = express();
const redisStore: redis.RedisStore = redis(session);

app.use(compression());
app.use(session({
	store: new redisStore({
		url: config.redis.url,
		port: config.redis.port,
	}),
	secret: '',
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
