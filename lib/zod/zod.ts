import { z } from 'zod';

const status = z.enum(['draft', 'active', 'deactivated'], {
	message: 'Status is Required',
});

const coupon_type = z.enum(['flat', 'percentage'], {
	message: 'Coupon Type is Required',
});

const image = z.union([
	z.instanceof(File).refine((file) => file.size > 0, 'Invalid file'),
	z.string().min(1, 'Invalid image/icon'),
]);

const refined = (
	data: { image_type: 'image' | 'icon'; image: File | string },
	imageField: any
) => {
	if (data.image_type === 'image' && !(imageField instanceof File)) {
		return false;
	}
	if (data.image_type === 'icon' && typeof imageField !== 'string') {
		return false;
	}
	return true;
};

const refinedImageMessage = {
	message: 'Invalid image or icon based on the image type',
	path: ['image'],
};

const image_type = z.enum(['image', 'icon'], {
	message: 'Image Type is Required',
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
	refined,
	refinedImageMessage,
};
