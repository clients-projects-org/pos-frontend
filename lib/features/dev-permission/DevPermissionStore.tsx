'use client';
import { z } from 'zod';
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
import { UseFormReturn } from 'react-hook-form';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
type FormValues = z.infer<typeof FormSchema>;
interface FormProps {
	methods: UseFormReturn<FormValues>;
	onSubmit: (data: FormValues) => void;
	isLoading: boolean;
	type: 'create' | 'edit';
}
export function DevPermissionStoreModal({ data }: { data?: DevNameType }) {
	const dev_name_id = data?._id;
	const [open, setOpen] = React.useState(false);

	const { methods } = devZodFrom();
	const [store, { isLoading }] = useStoreDevPermissionMutation();

	async function onSubmit(data: FormValues) {
		const storeData = {
			dev_name_id,
			name: data.name,
			code: data.code,
			status: data.status,
		};
		try {
			const response = await store({
				...storeData,
			} as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			setOpen(false);
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
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
				{/* form  */}
				<FormMutation
					isLoading={isLoading}
					methods={methods}
					onSubmit={onSubmit}
					type="create"
				/>
			</DialogContent>
		</Dialog>
	);
}
export function DevPermissionEditModal({ data }: { data: DevNameType }) {
	const dev_name_id = data?._id;

	const [open, setOpen] = React.useState(false);
	const { methods } = devZodFromEdit(data);

	const [store, { isLoading }] = useUpdateDevPermissionMutation();

	async function onSubmit(event: FormValues) {
		const storeData = {
			dev_name_id,
			name: event.name,
			code: event.code,
			status: event.status,
		};
		try {
			const response = await store({
				data: storeData,
				id: data._id,
			} as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			setOpen(false);
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
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
				{/* form  */}
				<FormMutation
					isLoading={isLoading}
					methods={methods}
					onSubmit={onSubmit}
					type="edit"
				/>
			</DialogContent>
		</Dialog>
	);
}

const FormMutation: React.FC<FormProps> = ({
	methods,
	onSubmit,
	isLoading,
	type,
}: FormProps) => {
	return (
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
					<Label htmlFor="code" className="text-right">
						Code
					</Label>
					<Input
						id="code"
						{...methods.register('code')}
						className="col-span-3"
					/>
					{methods.formState.errors.code && (
						<p className="text-red-500 col-span-4">
							{methods.formState.errors.code.message}
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
					{isLoading
						? type === 'create'
							? 'Creating...'
							: 'Updating...'
						: type === 'create'
							? 'Create New'
							: 'Update Changes'}
				</Button>
			</DialogFooter>
		</form>
	);
};
