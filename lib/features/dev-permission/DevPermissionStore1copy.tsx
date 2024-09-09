'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { FInput, RFSubmit, SelectStatus } from '@/components/custom/form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	addRoute,
	clearErrors,
	removeRoute,
	reset,
	setErrors,
	updateRoute,
	editValueSet,
} from './createSlice';
import { DynamicIcon } from '@/components/actions';
import {
	useEditDevPermissionMutation,
	useGetByIdQuery,
	useStoreDevPermissionMutation,
} from './devPermissionSlice';
import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { BarLoader } from '@/components/custom/loader';
import { zod } from '@/lib/zod';
import { useGetDevNameByIdQuery } from '../dev-permission-name';
import { Badge } from '@/components/ui/badge';
import { badge } from '@/lib/actions';
import { ApiUseHOC } from '@/components/hoc';

type InputType = React.ChangeEvent<HTMLInputElement>;
type PathType = 'edit_permission' | undefined;

export function DevPermissionStore({ slug }: { slug?: PathType }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const devNameId = searchParams.get('dev_name');
	// get data from api
	const {
		data: dataDevName,
		isLoading: isLoadingDevName,
		error: errorDevName,
		isFetching: isFetchingDevName,
	} = useGetDevNameByIdQuery(devNameId);

	// get id
	const id = slug && slug.split('-')[1];
	const path = slug && (slug.split('-')[0] as PathType);

	// dispatch & selector
	const dispatch = useAppDispatch();
	const formState = useAppSelector((state) => state.form);
	console.log(formState);
	// handle field value change
	const handleFieldChange = (key: 'name' | 'status', value: string) => {
		dispatch(updateField({ key, value }));
	};

	// handle route value change
	const handleRouteChange = (routeId: string, updates: any, index?: number) => {
		dispatch(updateRoute({ routeId, updates, index }));
	};

	// handle action value change

	// Define Zod schemas

	const DevRouteSchema = z.object({
		id: z.string(),
		name: zod.name,
		status: zod.status,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
	});

	const FormSchema = z.object({
		routes: z.array(DevRouteSchema),
		name: zod.name,
		status: zod.status,
	});

	// store api call
	const [addPost, { isLoading }] = useStoreDevPermissionMutation();
	const [editPost, { isLoading: isLoadingEdit }] =
		useEditDevPermissionMutation();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// reset error
		dispatch(clearErrors());

		const result = FormSchema.safeParse(formState);
		// remove all id from data
		if (result.success) {
			const dData = {
				...formState,
				name: formState.name,
				status: formState.status,
				routes: formState.routes.map((route) => {
					const { id, ...rest } = route;
					return {
						...rest,
					};
				}),
			};

			// store api call
			addPost(dData as any).then((e) => {
				console.log(e);
				dispatch(reset());

				router.push('/user-management/roles-permissions', { scroll: false });
				toast({
					title: 'You submitted the following values:',
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{JSON.stringify(e, null, 2)}</code>
						</pre>
					),
				});
			});
		} else {
			// Handle validation errors
			const errors = result.error.format();
			dispatch(setErrors(errors));
			console.log('errors', errors);
			console.log('error state', formState);
		}
	}

	console.log(dataDevName);
	useEffect(() => {
		if (dataDevName) {
			// dispatch(editValueSet(dataDevName?.data));
		}
	}, [dataDevName]);

	return (
		<div className="max-w-5xl mx-auto w-full border border-red-200 dark:border-red-950 p-4 rounded">
			{isLoading && <BarLoader />}
			<ApiUseHOC
				data={dataDevName}
				isFetching={isFetchingDevName}
				isLoading={isLoadingDevName}
			>
				<form onSubmit={onSubmit} className="space-y-5">
					<div className="border border-blue-200 dark:border-blue-950 p-3">
						<div className="flex justify-between">
							<h5 className="mb-2 underline text-sm">Main Details</h5>
						</div>
						<div className="grid grid-cols-12 gap-3 ">
							<div className="col-span-8">
								<p className="text-xl capitalize">{dataDevName?.data.name}</p>
							</div>
							<div className="col-span-4 space-y-2 flex flex-col">
								<div className="text-right">
									<Badge
										variant={
											dataDevName?.data.status &&
											badge(
												dataDevName?.data.status && dataDevName?.data.status
											)
										}
										// style={{ fontSize: isFor === 'child' ? '10px' : '12px' }}
										className={`text-xs capitalize `}
									>
										{dataDevName?.data.status}
									</Badge>
								</div>
							</div>
						</div>
					</div>

					<div className="border  border-blue-200 dark:border-blue-950  p-3 space-y-6 ">
						<div className="flex justify-between mb-3">
							<h5 className="mb-2 underline">Routes</h5>
							<Button
								variant="secondary"
								type="button"
								onClick={() => dispatch(addRoute())}
								size="sm"
							>
								<DynamicIcon icon="CirclePlus" className="h-4 w-4" />
							</Button>
						</div>
						{formState.routes.map((route, routeIndex) => (
							<div
								key={routeIndex}
								className="border border-green-200 dark:border-green-950 p-3 space-y-3"
							>
								<div className="grid grid-cols-12 gap-3">
									{/* name  */}
									<div className="col-span-8">
										<FInput
											id={`route-${route.id}-name`}
											label={'Route Name-' + (routeIndex + 1)}
											value={route.name}
											onChange={(e: InputType) =>
												handleRouteChange(
													route.id,
													{ name: e.target.value },
													routeIndex
												)
											}
											placeholder="Enter Route Name"
											error={
												formState.errors?.routes?.[routeIndex]?.name?._errors
											}
										/>
									</div>

									{/* status  */}
									<div className="col-span-2 space-y-2 flex flex-col">
										<Label className="capitalize">Status</Label>
										<SelectStatus
											placeholder="Select a Status"
											items="actDeDraft"
											defaultValue={route.status}
											onChange={(e) =>
												handleRouteChange(route.id, { status: e })
											}
										/>
									</div>

									{/* actions  */}
									<div className="col-span-1 space-y-2 flex flex-col">
										<Label className="capitalize">Action</Label>
										<Button
											type="button"
											variant="outline"
											className="flex w-full"
											disabled={formState.routes.length === 1}
											onClick={() =>
												dispatch(removeRoute({ routeId: route.id }))
											}
										>
											<DynamicIcon icon="Trash2" className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>

					<RFSubmit text="Create Dev Permission" />
				</form>
			</ApiUseHOC>
		</div>
	);
}
