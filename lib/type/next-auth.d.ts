import NextAuth, { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			address: string;
		} & DefaultSession['user'];

		accessToken: string;
		refreshToken: string;
		isLoggedIn: boolean;
	}
}
