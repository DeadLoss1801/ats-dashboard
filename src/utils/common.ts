import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';

export const hashPassword = async (pasword: string): Promise<string> => {
	pasword = await bcrypt.hash(pasword, 12);

	return pasword;
};

export const comparePassword = async (
	password: string,
	hash: string
): Promise<boolean> => await bcrypt.compare(password, hash);

export const isLoggedIn = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const token = req.cookies.login;
		if (!token) {
			return res
				.json({
					message: 'Please logged in',
				})
				.end();
		} else {
			const payload = jwt.verify(token, `${process.env.SECRET_KEY}`);

			if (typeof payload === 'object') {
				const id = payload.payload;
				// const employer = await EmployeeModel.findById(id);
				req.params.id = id;
				next();
			} else {
				return res
					.json({
						message: 'User not found',
					})
					.end();
			}
		}
	} catch (error) {
		console.log(error);
		return res
			.json({
				message: 'ERROR',
			})
			.end();
	}
};
