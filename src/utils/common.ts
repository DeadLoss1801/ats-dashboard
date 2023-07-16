import crypto from 'crypto';
export const random = () => crypto.randomBytes(120).toString('base64');

const SECRET = `${process.env.SECRET_KEY}`;
export const authentication = (salt: string, password: string) => {
	return crypto
		.createHmac('sha256', [salt, password].join('/'))
		.update(SECRET)
		.digest('hex');
};
