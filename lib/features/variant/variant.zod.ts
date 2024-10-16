import { statusData } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof FormSchema>;

const AttributeSchema = z.object({
	name: z.string().min(1, 'Attribute name is required'), // Ensure the attribute name is not empty
});
// schema
export const FormSchema = z
	.object({
		// name
		name: z
			.string()
			.min(2, {
				message: `Name is Required`,
			})
			.max(32, 'Name must be a maximum 32 characters'),

		// status
		status: zod.status,

		// description
		description: z.string().optional(),
		attributes: z.array(AttributeSchema).refine(
			(attributes) => {
				// Check for the uniqueness of attribute names
				const attributeNames = new Set<string>();
				for (const attribute of attributes) {
					if (attributeNames.has(attribute.name)) {
						return false; // If a duplicate is found, return false for refinement
					}
					attributeNames.add(attribute.name);
				}
				return true; // Return true if all attribute names are unique
			},
			{
				message: 'Attribute names must be unique',
				path: ['attributes'], // Show the error at the attributes level
			}
		),
	})
	.superRefine((data, ctx) => {
		const attributeNames = new Set<string>(); // To track unique attribute names

		data.attributes.forEach((attribute, index) => {
			// Check if attribute name is missing
			if (!attribute.name) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Attribute name is required',
					path: ['attributes', index, 'name'],
				});
			} else {
				// Check for duplicate attribute names
				if (attributeNames.has(attribute.name)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Duplicate attribute name found',
						path: ['attributes', index, 'name'], // Exact path to the attribute name
					});
				} else {
					// Add the attribute name to the set
					attributeNames.add(attribute.name);
				}
			}
		});
	});

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			description: '',
			attributes: [{ name: '' }],
		},
	});

	return { methods };
};

/* edit need another for password =============

*/

export type FormValuesEdit = z.infer<typeof FormSchemaEdit>;

// schema
export const FormSchemaEdit = z
	.object({
		// name
		name: z
			.string()
			.min(2, {
				message: `Name is Required`,
			})
			.max(32, 'Name must be a maximum 32 characters'),

		status: z.enum(statusData, {
			message: 'Status is Required',
		}),
		attributes: z.array(AttributeSchema).refine(
			(attributes) => {
				// Check for the uniqueness of attribute names
				const attributeNames = new Set<string>();
				for (const attribute of attributes) {
					if (attributeNames.has(attribute.name)) {
						return false; // If a duplicate is found, return false for refinement
					}
					attributeNames.add(attribute.name);
				}
				return true; // Return true if all attribute names are unique
			},
			{
				message: 'Attribute names must be unique',
				path: ['attributes'], // Show the error at the attributes level
			}
		),

		// description
		description: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		const attributeNames = new Set<string>(); // To track unique attribute names

		data.attributes.forEach((attribute, index) => {
			// Check if attribute name is missing
			if (!attribute.name) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Attribute name is required',
					path: ['attributes', index, 'name'],
				});
			} else {
				// Check for duplicate attribute names
				if (attributeNames.has(attribute.name)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Duplicate attribute name found',
						path: ['attributes', index, 'name'], // Exact path to the attribute name
					});
				} else {
					// Add the attribute name to the set
					attributeNames.add(attribute.name);
				}
			}
		});
	});

export const editZodFrom = (data: FormValuesEdit) => {
	const methods = useForm<FormValuesEdit>({
		resolver: zodResolver(FormSchemaEdit),
		defaultValues: {
			name: data?.name || '',
			status: data?.status || 'active',
			description: data?.description || '',
			attributes: data?.attributes || [{ name: '' }],
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				name: data?.name || '',
				status: data?.status || 'active',
				description: data?.description || '',
				attributes: data?.attributes || [{ name: '' }],
			});
		}
	}, [data, methods.reset]);

	return { methods };
};
