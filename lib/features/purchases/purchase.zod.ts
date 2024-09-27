import { DevNameType } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export const PurchaseDetailsSchema = z.object({
	product_id: z.string().min(2, { message: `Supplier is Required` }),
	unit_id: z.string().min(2, { message: `Supplier is Required` }),
	variant_id: z.string().min(2, { message: `Supplier is Required` }),
	quantity: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Quantity must be a number greater than 0',
		}),
	price: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Quantity must be a number greater than 0',
		}),
	sub_total: z.string(),
});
// schema
export const FormSchema = z.object({
	supplier_id: z.string().min(2, { message: `Supplier is Required` }),
	reference_number: z
		.string()
		.min(2, { message: 'Reference Number is Required' }),
	purchase_date: z.date({ message: 'Purchase Date is Required' }),
	purchase_status: z.enum(['received', 'cancelled', 'ordered'], {
		message: 'Purchase Status is Required',
	}),
	payment_method: z.string().min(2, { message: `Supplier is Required` }),
	payment_status: z.enum(['paid', 'unpaid'], {
		message: 'Payment Status is Required',
	}),

	total_amount: z.number(),
	total_quantity: z.number(),
	product_ids: z.array(z.string().min(2, { message: `Supplier is Required` })),

	description: z.string().optional(),
	product_id: z.string().optional(),
	paid_amount: z
		.string()
		.transform((val) => Number(val))
		.optional(),

	due_amount: z
		.string()
		.transform((val) => Number(val))
		.optional(),

	grand_total: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Total must be a number greater than 0',
		}),
	shipping_cost: z
		.string()
		.transform((val) => Number(val))
		.optional(),

	discount: z
		.string()
		.transform((val) => Number(val))
		.optional(),

	discount_type: z.enum(['percentage', 'fixed', 'none'], {
		message: 'Discount Type is Required',
	}),

	tax: z
		.string()
		.transform((val) => Number(val))
		.optional(),

	purchase_details: z.array(PurchaseDetailsSchema),
});

// store
export const devZodFrom = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: '',
			paid_amount: 0,
			due_amount: 0,
			discount: 0,
			discount_type: 'none',
			grand_total: 0,
			payment_method: '',
			payment_status: 'unpaid',
			product_ids: [],
			purchase_date: new Date(),
			purchase_details: [],
			purchase_status: 'ordered',
			reference_number: '',
			shipping_cost: 0,
			supplier_id: '',
			tax: 0,
			total_amount: 0,
			total_quantity: 0,
		},
	});

	return { methods };
};

// edit
export const devZodFromEdit = (data: DevNameType) => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: data.name,
			status: data.status,
			code: data.code,
		},
	});

	return { methods };
};
