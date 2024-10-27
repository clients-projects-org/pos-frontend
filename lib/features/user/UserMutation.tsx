'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
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
import { RoleType } from '@/lib/type';
import {
	useGetUserByIdQuery,
	useStoreUserMutation,
	useUpdateUserMutation,
} from './UserApiSlice';
import { useGetRolesQuery } from '../role';
import { userStoreImageInfo } from '@/lib/image-size';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import {
	createZodFrom,
	editZodFrom,
	FormSchema,
	FormValues,
	FormValuesEdit,
} from './user.zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageDetailsApiHOC } from '@/components/hoc';
interface FormProps {
	methods: UseFormReturn<FormValues>;
	onSubmit: (data: FormValues) => void;
	isLoading: boolean;
	type: 'create' | 'edit';
	roles: RoleType[];
	watching: FormValues;
}
interface FormPropsEdit {
	methods: UseFormReturn<FormValuesEdit>;
	onSubmit: (data: FormValuesEdit) => void;
	isLoading: boolean;
	type: 'create' | 'edit';
	roles: RoleType[];
	watching: FormValuesEdit;
}
export function UserEdit({ slug }: { slug: string }) {
	const userData = useGetUserByIdQuery(slug);
	const router = useRouter();
	const roles = useGetRolesQuery('active');

	const { methods } = editZodFrom(userData?.data?.data);
	const [store, { isLoading }] = useUpdateUserMutation();

	async function onSubmit(data: FormValuesEdit) {
		try {
			const response = await store({ data: data as any, id: slug }).unwrap();
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
		<PageDetailsApiHOC
			data={userData.data}
			isError={userData.isError}
			isLoading={userData.isLoading || roles.isLoading}
			isFetching={userData.isFetching || isLoading}
			error={userData.error}
		>
			<FormMutation
				methods={methods}
				onSubmit={onSubmit}
				isLoading={isLoading}
				roles={roles?.data?.data}
				watching={watching}
				type="edit"
			/>
		</PageDetailsApiHOC>
	);
}

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
		<PageDetailsApiHOC
			data={{ data: true, success: true }}
			isError={roles.isError}
			isLoading={roles.isLoading}
			isFetching={roles.isFetching || isLoading}
			error={roles.error}
		>
			<FormMutation
				methods={methods}
				onSubmit={onSubmit}
				isLoading={isLoading}
				roles={roles?.data?.data}
				watching={watching}
				type="create"
			/>
		</PageDetailsApiHOC>
	);
}

const FormMutation = ({
	methods,
	onSubmit,
	isLoading,
	type,
	roles,
	watching,
}: FormProps) => {
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

							{/* password  */}
							{type === 'create' && (
								<div>
									<RFInput
										label="Password"
										methods={methods}
										name="password"
										placeholder="Password"
									/>
								</div>
							)}
							{/* Permission  */}
							<div>
								<RFSelect
									methods={methods}
									data={roles}
									label="Role"
									name="role_id"
								>
									<SelectGroup>
										<SelectLabel>Role All List</SelectLabel>
										{roles?.map((item: RoleType) => (
											<SelectItem
												className="capitalize"
												value={item._id ? item._id : ''}
											>
												{item.name}
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
								{isLoading
									? type === 'create'
										? 'Creating...'
										: 'Updating...'
									: type === 'create'
										? 'Create New'
										: 'Update Changes'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
};
