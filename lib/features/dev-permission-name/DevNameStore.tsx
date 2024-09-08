'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { SelectStatus } from '@/components/custom/form';
import { zod } from '@/lib/zod';
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
import { useStoreDevNameMutation } from './devNameApiSlice';
import { DynamicIcon } from '@/components/actions';

export function DevNameStoreModal() {
	const [open, setOpen] = React.useState(false);

	const FormSchema = z.object({
		name: zod.name,
		code: zod.name,
		description: zod.description,
		status: zod.status,
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			code: '',
			description: '',
		},
	});

	const [store, { isLoading }] = useStoreDevNameMutation();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const response = await store({
				...data,
				created_by: 'admin',
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
					<span className="sr-only sm:not-sr-only capitalize">
						Create Permission
					</span>
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
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input
								id="description"
								{...methods.register('description')}
								className="col-span-3"
							/>
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
