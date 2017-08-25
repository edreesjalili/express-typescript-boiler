import { Request, Response } from 'express';

export function isLoggedIn() {
	return (req: Request, res: Response, next: Function) => req.isAuthenticated() ? next() : res.redirect('/');
}

export function isAdmin() {
	return (req: Request, res: Response, next: Function) => req.isAuthenticated() && req.user.group === 'admin' ? next() : res.redirect('/');
}
