'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn, useSession } from 'next-auth/react';
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
import { Input } from '@/components/ui/input';
import { useAuthLoginMutation } from '@/lib/features/auth/apiSlice';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const FormSchema = z.object({
	email: z.string().min(2, {
		message: 'Please Enter Your Email',
	}),
	password: z.string().min(2, {
		message: 'You Have To Enter Password',
	}),
});

export default function InputForm() {
	const { data: session } = useSession();
	console.log(session);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [store, { isLoading }] = useAuthLoginMutation();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		// const result = await signIn('credentials', {
		// 	email: data.email,
		// 	password: data.password,
		// 	redirect: false,
		// });
		try {
			const res: any = await store({ ...data } as any);
			const result = await signIn('credentials', {
				token: JSON.stringify(res.data.data),
				redirect: false,
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Login</CardTitle>
					<CardDescription>
						Enter your information to login your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="  space-y-6"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Email" {...field} />
										</FormControl>
										<FormDescription>Enter your email address.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormDescription>Enter your password.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={isLoading} type="submit">
								Submit
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
