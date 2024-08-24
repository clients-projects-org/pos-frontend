// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Username' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				const res = await fetch('http://localhost:8080/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: credentials?.username,
						password: credentials?.password,
					}),
				});

				const user = await res.json();

				if (res.ok && user) {
					// Assuming the token is in `user.token`
					return {
						...user,
						token: user.token, // Attach the token to the user object
					};
				}
				return null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.token; // Store the token in the JWT
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken; // Make the token available in the session
			return session;
		},
	},
});

export { handler as GET, handler as POST };
