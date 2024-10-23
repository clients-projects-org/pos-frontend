import { generateUniqueId } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Simplified schema with only the relevant fields
export const FormSchema = z.object({
	discount_type: z.enum(['percentage', 'fixed', 'none'], {
		message: 'Discount type is required',
	}),
	paid_amount: z.preprocess(
		(val) => {
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num;
			}
			return val;
		},
		z.number().min(0, { message: 'Paid amount is required' })
	),
	discount_value: z.preprocess(
		(val) => {
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num;
			}
			return val;
		},
		z.number().min(0, { message: 'Paid amount is required' })
	),
	tax: z.preprocess(
		(val) => {
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num;
			}
			return val;
		},
		z.number().min(0, { message: 'Tax must be 0 or greater' })
	),
	shipping_cost: z.preprocess(
		(val) => {
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num;
			}
			return val;
		},
		z.number().min(0, { message: 'Tax must be 0 or greater' })
	),
	invoice_number: z
		.string()
		.min(1, 'Reference number is required')
		.max(30, 'Reference number maximum 30 characters'),
});

// Function to compute the due amount
export const computeDueAmount = (
	paid_amount: number,
	total_cost: number
): number => {
	return total_cost - paid_amount;
};

export const createZodFromPos = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: getDefaultValues(),
	});

	const resetForm = () => {
		methods.reset(getDefaultValues());
	};

	return { methods, resetForm, computeDueAmount };
};

// Default values for the simplified form
const getDefaultValues = (): FormValuesPos => ({
	discount_type: 'none',
	paid_amount: 0,
	discount_value: 0,
	shipping_cost: 0,
	tax: 0,
	invoice_number: 'INV-' + generateUniqueId(),
});

export type FormValuesPos = z.infer<typeof FormSchema>;
