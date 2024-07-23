import { z } from 'zod';

const status = z.enum(['draft', 'active', 'deactivated'], {
	message: 'Status is Required',
});
const image_type = z.enum(['image', 'icon'], {
	message: 'Image Type is Required',
});
const coupon_type = z.enum(['flat', 'percentage'], {
	message: 'Coupon Type is Required',
});
const image = z.string({
	message: 'Invalid image/icon',
});
const name = z.string().min(2, {
	message: 'Must be at least 2 characters.',
});
const email = z.string().email({
	message: 'Invalid email address.',
});
const phone = z.string().min(2, {
	message: 'Must be at least 2 characters.',
});
const description = z.string().min(2, {
	message: 'Description must be at least 2 characters.',
});
const id = z.string({
	message: 'Is Required',
});

const number = z.number({
	message: 'Is required',
});
const date = z.date({
	message: 'Date Is required',
});

export const zod = {
	status,
	image_type,
	name,
	email,
	description,
	image,
	id,
	phone,
	coupon_type,
	number,
	date,
};
