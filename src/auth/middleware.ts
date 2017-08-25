import { Request, Response } from 'express';

export function isLoggedIn() {
	return (req: Request, res: Response, next: Function) => req.isAuthenticated() ? next() : res.redirect('/');
}
