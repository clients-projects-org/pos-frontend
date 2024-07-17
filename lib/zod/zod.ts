import { z } from 'zod';

const status = z.enum(['draft', 'active', 'deactivated'], {
	message: 'Status is Required',
});
const image_type = z.enum(['image', 'icon'], {
	message: 'Image Type is Required',
});
const name = z.string().min(2, {
	message: 'Must be at least 2 characters.',
});

export const zod = { status, image_type, name };
