import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const variantSchema = z.object({
	unit_id: z.string().nonempty('Unit is required'),
	variant_id: z.string().nonempty('Variant is required'),
	quantity: z.number().positive('Quantity must be a positive number'),
});

const productSchema = z.object({
	product_id: z.string().nonempty('Product is required'),
	warehouse_id: z.string().nonempty('Warehouse is required'),
	store_id: z.string().nonempty('Store is required'),
	variants: z.array(variantSchema).min(1, 'At least one variant is required'),
});

export const FormSchema = z.object({
	supplier_id: z.string().min(2, 'Supplier is required'),
	products: z.array(productSchema).min(1, 'At least one product is required'),
});

export const createZodFromNew = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {},
	});

	return { methods };
};

export type FormValuesNew = z.infer<typeof FormSchema>;
