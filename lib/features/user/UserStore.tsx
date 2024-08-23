'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import {
	ImageIcoRadio,
	RFIcon,
	RFImage,
	RFInput,
	RFSelect,
	RFStatus,
	RFSubmit,
	RFTextarea,
} from '@/components/custom/form';
import { zod } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { DevPermissionType } from '@/lib/type';
import { useStoreUserMutation } from './UserApiSlice';
import { useGetRolesQuery } from '../role';
import { userStoreImageInfo } from '@/lib/image-size';

const FormSchema = z
	.object({
		name: zod.name,
		email: zod.email,
		role_id: zod.id,
		description: zod.description,
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
		phone: zod.name,
		password: zod.name,
	})
	.refine((data) => zod.refined(data, data.image), zod.refinedImageMessage);

export type UserStoreType = z.infer<typeof FormSchema>;

export function UserStore() {
	const router = useRouter();
	const roles = useGetRolesQuery('active');

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			email: '',
			phone: '',
			password: '',
			role_id: '',
			image: 'Aperture',
			image_type: 'icon',
			description: '',
		},
	});
	const [store] = useStoreUserMutation();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const formData = new FormData();

		// Convert the form data to FormData
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		console.log(data);
		store(data as any).then((e) => {
			// router.push('/user-management/users', { scroll: false });

			// router.push('/user-management/roles-permissions', { scroll: false });
			return;
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
						<FormField
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
						/>
						{watching.image_type === 'image' ? (
							<RFImage<UserStoreType>
								methods={methods}
								imageInfo={userStoreImageInfo}
							/>
						) : (
							<div className="space-y-2   ">
								<RFIcon methods={methods} label={false} />
							</div>
						)}
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<RFInput
									label="User Name"
									methods={methods}
									name="name"
									placeholder="User Name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFStatus methods={methods} name="status" />
							</div>
						</div>
						{/* Email */}
						<div className="grid grid-cols-2 gap-3">
							<RFInput
								label="Email"
								methods={methods}
								name="email"
								placeholder="Email"
							/>
							<RFInput
								label="Phone"
								methods={methods}
								name="phone"
								placeholder="Phone"
							/>
						</div>
						<div className="grid grid-cols-12 gap-3">
							{/* password  */}
							<div className="col-span-6">
								<RFInput
									label="Password"
									methods={methods}
									name="password"
									placeholder="Password"
								/>
							</div>

							{/* Permission  */}
							<div className="col-span-6">
								<RFSelect
									methods={methods}
									data={roles.data?.data}
									label="Role"
									name="role_id"
								>
									<SelectGroup>
										<SelectLabel>Role All List</SelectLabel>
										{roles.data?.data?.map((dev: DevPermissionType) => (
											<SelectItem
												className="capitalize"
												value={dev._id ? dev._id : ''}
											>
												{dev.name}
											</SelectItem>
										))}
									</SelectGroup>
								</RFSelect>
							</div>
						</div>

						<RFTextarea methods={methods} />

						<RFSubmit text="Create User" />
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
