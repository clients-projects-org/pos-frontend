import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				token: {},
			},
			async authorize(credentials) {
				console.log({ credentials });
				if (credentials?.token) {
					return {
						id: '123',
						token: JSON.parse(credentials.token),
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
		async jwt({ token, user }: { token: any; user: any }) {
			console.log(user, 'user,jwt');
			console.log(token, 'token, cb');
			if (user) {
				return {
					...user,
				};
			}
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			// Attach the JWT token and user details to the session
			console.log({ session, token }, 'token');
			session.accessToken = token.token.accessToken;
			session.refreshToken = token.token.refreshToken;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
