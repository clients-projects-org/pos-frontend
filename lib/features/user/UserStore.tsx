'use client';
import { FormProvider } from 'react-hook-form';
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
	RFTextarea,
} from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { DevPermissionType } from '@/lib/type';
import { useStoreUserMutation } from './UserApiSlice';
import { useGetRolesQuery } from '../role';
import { userStoreImageInfo } from '@/lib/image-size';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import { createZodFrom, FormSchema, FormValues } from './user.zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function UserStore() {
	const router = useRouter();
	const roles = useGetRolesQuery('active');

	const { methods } = createZodFrom();
	const [store, { isLoading }] = useStoreUserMutation();

	async function onSubmit(data: FormValues) {
		try {
			const response = await store(data as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/user-management/users');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	const watching = methods.watch();
	// const methods = useForm();
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
							<RFImage<FormValues>
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

						<div className="flex justify-end gap-3">
							<Link href="/user-management/users">
								<Button
									disabled={isLoading}
									variant="destructive"
									type="button"
								>
									Cancel
								</Button>
							</Link>
							<Button disabled={isLoading} variant="default" type="submit">
								{isLoading ? 'Creating...' : 'Create User'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
