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
import { useStoreCustomerMutation } from './apiSlice';
import { useEffect } from 'react';
export function Store({ slug }: { slug?: string }) {
	const router = useRouter();
	const FormSchema = z.object({
		name: zod.name,
		code: zod.name,
		email: zod.email,
		phone: zod.phone,
		address: zod.name,
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
			email: '',
			phone: '',
			code: '',
			image: 'Aperture',
			image_type: 'icon',
			description: '',
			address: '',
		},
	});
	useEffect(() => {
		if (slug) {
			// methods.setValue(,true, true);
		}
	}, [slug]);
	const [store, { isLoading }] = useStoreCustomerMutation();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		store({ ...data, created_by: 'admin' } as any).then((e) => {
			console.log(e);
			router.push('/peoples/customers', { scroll: false });

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
								<RFInput
									label="Customer Name"
									methods={methods}
									name="name"
									placeholder="Type Name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFStatus methods={methods} name="status" />
							</div>
						</div>

						<div className="grid grid-cols-12 gap-3">
							{/* email  */}
							<div className="col-span-6">
								<RFInput label="Email" methods={methods} name="email" />
							</div>
							{/* phone  */}
							<div className="col-span-6">
								<RFInput label="Phone" methods={methods} name="phone" />
							</div>
						</div>

						<div className="grid grid-cols-12 gap-3">
							{/* code  */}
							<div className="col-span-6">
								<RFInput
									label="Code"
									methods={methods}
									name="code"
									placeholder="Code"
								/>
							</div>
						</div>

						<RFTextarea methods={methods} label="Address" name="address" />
						<RFTextarea methods={methods} />

						<RFSubmit text="Create Customer" />
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
