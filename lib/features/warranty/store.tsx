'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';

import { Form } from '@/components/ui/form';
import {
	RFIcon,
	RFImage,
	RFInput,
	RFStatus,
	RFSubmit,
	RFTextarea,
} from '@/components/custom/form';
import { zod } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { useStoreWarrantyMutation } from './apiSlice';
import { useEffect } from 'react';
export function Store({ slug }: { slug?: string }) {
	const router = useRouter();
	const FormSchema = z.object({
		name: zod.name,
		periods: zod.name,
		code: zod.name,
		description: zod.description,
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			code: '',
			image: 'Aperture',
			image_type: 'icon',
			description: '',
			periods: '',
		},
	});
	useEffect(() => {
		if (slug) {
			// methods.setValue(,true, true);
		}
	}, [slug]);
	const [store, { isLoading }] = useStoreWarrantyMutation();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		store({ ...data, created_by: 'admin' } as any).then((e) => {
			console.log(e);
			router.push('/inventory/warranties', { scroll: false });

			// router.push('/user-management/roles-permissions', { scroll: false });
			toast({
				title: 'You submitted the following values:',
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(e, null, 2)}</code>
					</pre>
				),
			});
		});
	}
	const watching = methods.watch();
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						{/* <FormField
							control={methods.control}
							name="image_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image or Icon</FormLabel>
									<FormControl>
										<ImageIcoRadio {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						{watching.image_type === 'image' ? (
							<RFImage methods={methods} />
						) : (
							<div className="space-y-2   ">
								<RFIcon methods={methods} label={false} />
							</div>
						)}
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<RFInput label="Warranty Name" methods={methods} name="name" />
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFStatus methods={methods} name="status" />
							</div>
						</div>

						<div className="grid grid-cols-12 gap-3">
							{/* code  */}
							<div className="col-span-6">
								<RFInput label="Code" methods={methods} name="code" />
							</div>

							{/* code  */}
							<div className="col-span-6">
								<RFInput label="Periods" methods={methods} name="periods" />
							</div>
						</div>

						<RFTextarea methods={methods} />

						<RFSubmit text="Create Warranty" />
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
