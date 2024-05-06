'use client';
import { Bird, CalendarIcon, Rabbit, Turtle, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PageTitle from '@/components/custom/PageTitle';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	dob: z.date({
		required_error: 'A date of birth is required.',
	}),
});
export default function CreateProducts() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<>
			<PageTitle title="Create Product" />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid w-full items-start gap-6">
						<div className="grid gap-6 rounded-lg border p-4 grid-cols-12">
							<div className="col-span-5 rounded-lg border p-4">
								<div className="grid gap-2">
									<Image
										alt="Product image"
										className="aspect-square w-full rounded-md object-cover"
										height="300"
										src="https://ui.shadcn.com/placeholder.svg"
										width="300"
									/>
									<div className="grid grid-cols-3 gap-2">
										<button>
											<Image
												alt="Product image"
												className="aspect-square w-full rounded-md object-cover"
												height="84"
												src="https://ui.shadcn.com/placeholder.svg"
												width="84"
											/>
										</button>
										<button>
											<Image
												alt="Product image"
												className="aspect-square w-full rounded-md object-cover"
												height="84"
												src="https://ui.shadcn.com/placeholder.svg"
												width="84"
											/>
										</button>
										<button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
											<Upload className="h-4 w-4 text-muted-foreground" />
											<span className="sr-only">Upload</span>
										</button>
									</div>
								</div>
							</div>
							<div className="col-span-7 rounded-lg border p-4">
								<div className=" grid grid-cols-12 gap-x-4 gap-y-6">
									<div className="col-span-12">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Product Name</FormLabel>
													<FormControl>
														<Input placeholder="shadcn" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Select>
															<SelectTrigger
																id="model"
																className="items-start [&_[data-description]]:hidden"
															>
																<SelectValue placeholder="Select a model" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="genesis">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Rabbit className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Genesis
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Our fastest model for general use cases.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="explorer">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Bird className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Explorer
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Performance and speed for efficiency.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="quantum">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Turtle className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Quantum
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				The most powerful model for complex
																				computations.
																			</p>
																		</div>
																	</div>
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Select>
															<SelectTrigger
																id="model"
																className="items-start [&_[data-description]]:hidden"
															>
																<SelectValue placeholder="Select a model" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="genesis">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Rabbit className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Genesis
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Our fastest model for general use cases.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="explorer">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Bird className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Explorer
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Performance and speed for efficiency.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="quantum">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Turtle className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Quantum
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				The most powerful model for complex
																				computations.
																			</p>
																		</div>
																	</div>
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Select>
															<SelectTrigger
																id="model"
																className="items-start [&_[data-description]]:hidden"
															>
																<SelectValue placeholder="Select a model" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="genesis">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Rabbit className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Genesis
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Our fastest model for general use cases.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="explorer">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Bird className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Explorer
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Performance and speed for efficiency.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="quantum">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Turtle className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Quantum
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				The most powerful model for complex
																				computations.
																			</p>
																		</div>
																	</div>
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input
															id="temperature"
															type="number"
															placeholder="0.4"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input
															id="temperature"
															type="number"
															placeholder="0.4"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input
															id="temperature"
															type="number"
															placeholder="0.4"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input
															id="temperature"
															type="number"
															placeholder="0.4"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Select>
															<SelectTrigger
																id="model"
																className="items-start [&_[data-description]]:hidden"
															>
																<SelectValue placeholder="Select a model" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="genesis">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Rabbit className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Genesis
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Our fastest model for general use cases.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="explorer">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Bird className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Explorer
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Performance and speed for efficiency.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="quantum">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Turtle className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Quantum
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				The most powerful model for complex
																				computations.
																			</p>
																		</div>
																	</div>
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Select>
															<SelectTrigger
																id="model"
																className="items-start [&_[data-description]]:hidden"
															>
																<SelectValue placeholder="Select a model" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="genesis">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Rabbit className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Genesis
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Our fastest model for general use cases.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="explorer">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Bird className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Explorer
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				Performance and speed for efficiency.
																			</p>
																		</div>
																	</div>
																</SelectItem>
																<SelectItem value="quantum">
																	<div className="flex items-start gap-3 text-muted-foreground">
																		<Turtle className="size-5" />
																		<div className="grid gap-0.5">
																			<p>
																				Neural{' '}
																				<span className="font-medium text-foreground">
																					Quantum
																				</span>
																			</p>
																			<p className="text-xs" data-description>
																				The most powerful model for complex
																				computations.
																			</p>
																		</div>
																	</div>
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Input placeholder="shadcn" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Username</FormLabel>
													<FormControl>
														<Input placeholder="shadcn" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="dob"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<div>
														<FormLabel>Date of birth</FormLabel>
													</div>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={cn(
																		' pl-3 text-left font-normal',
																		!field.value && 'text-muted-foreground'
																	)}
																>
																	{field.value ? (
																		format(field.value, 'PPP')
																	) : (
																		<span>Pick a date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start"
														>
															<Calendar
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1900-01-01')
																}
																initialFocus
															/>
														</PopoverContent>
													</Popover>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="col-span-12">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Product Description</FormLabel>
													<FormControl>
														<Textarea
															id="content"
															placeholder="You are a..."
															className="min-h-[9.5rem]"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-12">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Product Description</FormLabel>
													<FormControl>
														<Textarea
															id="content"
															placeholder="You are a..."
															className="min-h-[9.5rem]"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="col-span-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Select</FormLabel>
													<FormControl>
														<Select defaultValue="system">
															<SelectTrigger>
																<SelectValue placeholder="Select a role" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="system">System</SelectItem>
																<SelectItem value="user">User</SelectItem>
																<SelectItem value="assistant">
																	Assistant
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="col-span-12 flex justify-end">
								<Button type="submit">Create Product</Button>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
}
