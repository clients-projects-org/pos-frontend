'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import {
	FInput,
	IconModal,
	RFSubmit,
	SelectStatus,
} from '@/components/custom/form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import {
	addAction,
	addRoute,
	clearErrors,
	removeAction,
	removeRoute,
	reset,
	setErrors,
	updateAction,
	updateField,
	updateRoute,
} from './createSlice';
import { DynamicIcon } from '@/components/actions';
import {
	useGetByIdQuery,
	useStoreDevPermissionMutation,
} from './devPermissionSlice';
import { Label } from '@/components/ui/label';
import React from 'react';
import { toast } from '@/components/ui/use-toast';
import { BarLoader } from '@/components/custom/loader';
import { zod } from '@/lib/zod';

type InputType = React.ChangeEvent<HTMLInputElement>;
export function DevPermissionStore({ slug }: { slug?: string }) {
	const router = useRouter();
	const id = slug && slug.split('-')[1];
	const {
		data,
		isLoading: isLoadingView,
		error,
		isFetching,
	} = useGetByIdQuery(id);
	const dispatch = useAppDispatch();
	const formState = useAppSelector((state) => state.form);

	const handleFieldChange = (key: 'name' | 'status', value: string) => {
		dispatch(updateField({ key, value }));
	};

	const handleRouteChange = (routeId: string, updates: any, index?: number) => {
		dispatch(updateRoute({ routeId, updates, index }));
	};

	const handleActionChange = (
		routeId: string,
		actionId: string,
		updates: any,
		actionIndex?: number,
		routeIndex?: number
	) => {
		dispatch(
			updateAction({ routeId, actionId, updates, actionIndex, routeIndex })
		);
	};
	// Define Zod schemas

	const RouteActionSchema = z.object({
		id: z.string(),
		name: zod.name,
		status: zod.status,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
	});

	const DevRouteSchema = z.object({
		id: z.string(),
		name: zod.name,
		status: zod.status,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
		actions: z.array(RouteActionSchema),
	});

	const FormSchema = z.object({
		routes: z.array(DevRouteSchema),
		name: zod.name,
		status: zod.status,
	});

	// useEffect(() => {
	// 	reset(formState);
	// }, [formState, reset]);
	const [addPost, { isLoading }] = useStoreDevPermissionMutation();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(clearErrors());
		const result = FormSchema.safeParse(formState);
		if (result.success) {
			const dData = {
				...formState,
				name: formState.name,
				status: formState.status,
				routes: formState.routes.map((route) => {
					const { id, ...rest } = route;
					return {
						...rest,
						actions: route.actions.map((action) => {
							const { id, ...rest } = action;
							return {
								...rest,
							};
						}),
					};
				}),
			};
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

	return (
		<div className="max-w-5xl mx-auto w-full border border-red-200 dark:border-red-950 p-4 rounded">
			{isLoading && <BarLoader />}
			<form onSubmit={onSubmit} className="space-y-5">
				<div className="border border-blue-200 dark:border-blue-950 p-3">
					<div className="flex justify-between">
						<h5 className="mb-2 underline">Main Details</h5>
					</div>
					<div className="grid grid-cols-12 gap-3 ">
						<div className="col-span-8">
							<FInput
								id="MainTitle"
								label="Main Title"
								value={formState.name}
								onChange={(e: InputType) =>
									handleFieldChange('name', e.target.value)
								}
								placeholder="Enter Main Title"
								error={formState.errors?.name?._errors}
							/>
						</div>
						<div className="col-span-4 space-y-2 flex flex-col">
							<Label className="capitalize">Status</Label>
							<SelectStatus
								placeholder="Select a Status"
								items="actDeDraft"
								defaultValue={formState.status}
								onChange={(value) => handleFieldChange('status', value)}
							/>
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
										onChange={(e) => handleRouteChange(route.id, { status: e })}
									/>
								</div>

								{/* icon  */}
								<div className="col-span-1 space-y-2 flex flex-col">
									<Label className="capitalize">Icon</Label>
									<IconModal
										onSave={(value) => {
											handleRouteChange(route.id, { image: value });
										}}
										defaultValue={route.image}
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
										onClick={() => dispatch(removeRoute({ routeId: route.id }))}
									>
										<DynamicIcon icon="Trash2" className="h-4 w-4" />
									</Button>
								</div>
							</div>
							<div className="border border-yellow-200 dark:border-cyan-950 p-3 space-y-3">
								<div className="flex justify-between mb-3">
									<h5 className="mb-2 underline">Actions</h5>
									<Button
										variant="secondary"
										type="button"
										size="sm"
										onClick={() => dispatch(addAction({ routeId: route.id }))}
									>
										<DynamicIcon icon="CirclePlus" className="h-4 w-4" />
									</Button>
								</div>
								{route.actions.map((action, actionIndex) => (
									<div key={actionIndex} className="grid grid-cols-12 gap-3">
										<div className="col-span-8">
											<FInput
												id={`route-${route.id}-action-${action.id}-name`}
												label={'Action Name-' + (actionIndex + 1)}
												value={action.name}
												onChange={(e: InputType) =>
													handleActionChange(
														route.id,
														action.id,
														{
															name: e.target.value,
														},
														actionIndex,
														routeIndex
													)
												}
												placeholder="Enter Action Name"
												error={
													formState.errors?.routes?.[routeIndex]?.actions?.[
														actionIndex
													].name?._errors
												}
											/>
										</div>
										<div className="col-span-2">
											<Label className="capitalize">Status</Label>
											<SelectStatus
												placeholder="Select a Status"
												items="actDeDraft"
												defaultValue={action.status}
												onChange={(e) =>
													handleActionChange(route.id, action.id, {
														status: e,
													})
												}
											/>
										</div>
										<div className="col-span-1 space-y-2 flex flex-col">
											<Label className="capitalize">Icon</Label>
											<IconModal
												onSave={(value) => {
													handleActionChange(route.id, action.id, {
														image: value,
													});
												}}
												defaultValue={action.image}
											/>
										</div>
										<div className="col-span-1 space-y-2 flex flex-col">
											<Label className="capitalize">Action</Label>
											<Button
												type="button"
												variant="outline"
												className="flex w-full"
												disabled={route.actions.length === 1}
												onClick={() =>
													dispatch(
														removeAction({
															routeId: route.id,
															actionId: action.id,
														})
													)
												}
											>
												<DynamicIcon icon="Trash2" className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<RFSubmit text="Create Dev Permission" />
			</form>
		</div>
	);
}
