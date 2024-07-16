'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { SelectStatus } from '@/components/custom/form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addAction, addRoute, removeAction, removeRoute } from './createSlice';
import { DynamicIcon } from '@/components/actions';

export function DevPermissionStore() {
	const dispatch = useAppDispatch();
	const formState = useAppSelector((state) => state.form);
	console.log({ formState });
	// Define Zod schemas
	const StatusTypeSchema = z.enum(['draft', 'active', 'deactivated']);

	const RouteActionSchema = z.object({
		id: z.string(),
		name: z.string(),
		status: StatusTypeSchema,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
	});

	const DevRouteSchema = z.object({
		id: z.string(),
		name: z.string(),
		status: StatusTypeSchema,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
		actions: z.array(RouteActionSchema),
	});

	const FormSchema = z.object({
		routes: z.array(DevRouteSchema),
		name: z.string(),
		status: StatusTypeSchema,
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: formState,
	});
	const { control, handleSubmit, reset } = methods;

	useEffect(() => {
		reset(formState);
	}, [formState, reset]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log({ data });
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	// console.log(methods.getValues());
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border border-red-200 dark:border-red-950 p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						<div className="border border-blue-200 dark:border-blue-950 p-3">
							<div className="flex justify-between">
								<h5 className="mb-2 underline">Main Details</h5>
							</div>
							<div className="grid grid-cols-12 gap-3 ">
								<div className="col-span-8">
									<FormField
										control={control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Main Title</FormLabel>
												<FormControl>
													<Input
														placeholder="Add Main Title"
														{...field}
														type="text"
														autoComplete="off"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-4">
									<FormField
										control={control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<FormControl>
													<SelectStatus
														onChange={field.onChange}
														placeholder="Select a Status"
														items="actDeDraft"
														defaultValue={formState.status}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
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
										<div className="col-span-8">
											<Controller
												name={`routes.${routeIndex}.name`}
												control={control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Route Name</FormLabel>
														<FormControl>
															<Input
																placeholder="Add Route Name"
																{...field}
																type="text"
																autoComplete="off"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="col-span-2">
											<Controller
												name={`routes.${routeIndex}.status`}
												control={control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Status</FormLabel>
														<FormControl>
															<SelectStatus
																onChange={field.onChange}
																placeholder="Select a Status"
																items="actDeDraft"
																defaultValue={field.value}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="col-span-1 space-y-2">
											<FormLabel>Choose</FormLabel>
											<Button
												variant="outline"
												className="w-full"
												type="button"
											>
												Icon
											</Button>
										</div>
										<div className="col-span-1 space-y-2">
											<FormLabel>Actions</FormLabel>
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
									<div className="border border-yellow-200 dark:border-cyan-950 p-3 space-y-3">
										<div className="flex justify-between mb-3">
											<h5 className="mb-2 underline">Actions</h5>
											<Button
												variant="secondary"
												type="button"
												size="sm"
												onClick={() =>
													dispatch(addAction({ routeId: route.id }))
												}
											>
												<DynamicIcon icon="CirclePlus" className="h-4 w-4" />
											</Button>
										</div>
										{route.actions.map((action, actionIndex) => (
											<div
												key={actionIndex}
												className="grid grid-cols-12 gap-3"
											>
												<div className="col-span-8">
													<Controller
														name={`routes.${routeIndex}.actions.${actionIndex}.name`}
														control={control}
														render={({ field }) => (
															<FormItem>
																<FormLabel>Action Name</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Add Action Name"
																		{...field}
																		type="text"
																		autoComplete="off"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												<div className="col-span-2">
													<Controller
														name={`routes.${routeIndex}.actions.${actionIndex}.status`}
														control={control}
														render={({ field }) => (
															<FormItem>
																<FormLabel>Status</FormLabel>
																<FormControl>
																	<SelectStatus
																		onChange={field.onChange}
																		placeholder="Select a Status"
																		items="actDeDraft"
																		defaultValue={field.value}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												<div className="col-span-1 space-y-2">
													<FormLabel>Choose</FormLabel>
													<Button
														variant="outline"
														className="w-full"
														type="button"
													>
														Icon
													</Button>
												</div>
												<div className="col-span-1 space-y-2">
													<FormLabel>Actions</FormLabel>
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

						<div className="flex justify-end">
							<Button
								variant="outline"
								className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600"
								type="submit"
							>
								Create New Permission
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
