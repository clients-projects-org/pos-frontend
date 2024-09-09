'use client';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { SelectStatus } from '@/components/custom/form';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	useStoreDevPermissionMutation,
	useUpdateDevPermissionMutation,
} from './devPermissionSlice';
import { DynamicIcon } from '@/components/actions';
import { DevNameType } from '@/lib/type';
import { devZodFrom, devZodFromEdit, FormSchema } from './dev-permission.zod';

export function DevPermissionStoreModal({ data }: { data?: DevNameType }) {
	const dev_name_id = data?._id;
	const [open, setOpen] = React.useState(false);

	const { methods } = devZodFrom();
	const [store, { isLoading }] = useStoreDevPermissionMutation();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const storeData = {
			dev_name_id,
			name: data.name,
			status: data.status,
		};
		try {
			const response = await store({
				...storeData,
			} as any).unwrap();
			toast({
				title: 'Success!',
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{JSON.stringify(response, null, 2)}
						</code>
					</pre>
				),
			});
			setOpen(false);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'An error occurred while saving.',
				variant: 'destructive',
			});
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<DynamicIcon icon="PlusCircle" className="h-4 w-4 sm:mr-2" />
					<span className="sr-only sm:not-sr-only capitalize">Add List</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Permission</DialogTitle>
					<DialogDescription>
						Permission Group is a collection of permissions.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								{...methods.register('name')}
								className="col-span-3"
							/>
							{methods.formState.errors.name && (
								<p className="text-red-500 col-span-4">
									{methods.formState.errors.name.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="status" className="text-right">
								Status
							</Label>
							<div className="col-span-3">
								<SelectStatus
									placeholder="Select a status"
									items="actDeDraft"
									defaultValue={methods.getValues('status')}
									onChange={(value) => methods.setValue('status', value)}
								/>
							</div>

							{methods.formState.errors.status && (
								<p className="text-red-500 col-span-4">
									{methods.formState.errors.status.message}
								</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? 'Saving...' : 'Save changes'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
export function DevPermissionEditModal({ data }: { data: DevNameType }) {
	const dev_name_id = data?._id;

	const [open, setOpen] = React.useState(false);
	const { methods } = devZodFromEdit(data);

	const [store, { isLoading }] = useUpdateDevPermissionMutation();

	async function onSubmit(submitData: z.infer<typeof FormSchema>) {
		const storeData = {
			dev_name_id,
			name: submitData.name,
			status: submitData.status,
		};
		try {
			const response = await store({
				data: storeData,
				id: data._id,
			} as any).unwrap();
			toast({
				title: 'Success!',
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{JSON.stringify(response, null, 2)}
						</code>
					</pre>
				),
			});
			setOpen(false);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'An error occurred while saving.',
				variant: 'destructive',
			});
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="link"
					className="px-2 w-full justify-start hover:no-underline"
				>
					<DynamicIcon icon="SquarePen" className="h-4 w-4 sm:mr-2" />
					<span className="sr-only sm:not-sr-only capitalize">Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Permission Name</DialogTitle>
					<DialogDescription>
						Permission Group is a collection of permissions.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								{...methods.register('name')}
								className="col-span-3"
							/>
							{methods.formState.errors.name && (
								<p className="text-red-500 col-span-4">
									{methods.formState.errors.name.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="status" className="text-right">
								Status
							</Label>
							<div className="col-span-3">
								<SelectStatus
									placeholder="Select a status"
									items="actDeDraft"
									defaultValue={methods.getValues('status')}
									onChange={(value) => methods.setValue('status', value)}
								/>
							</div>

							{methods.formState.errors.status && (
								<p className="text-red-500 col-span-4">
									{methods.formState.errors.status.message}
								</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? 'Saving...' : 'Edit changes'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
