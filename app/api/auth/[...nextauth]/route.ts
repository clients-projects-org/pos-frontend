import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
async function refreshAccessToken(token) {
	console.log('Refreshing access token', token);
	try {
		console.log('Beaarer token', `Bearer ${token.refreshToken}`);

		const response = await fetch(
			`${process.env.API_SERVER_BASE_URL}/api/auth/refresh`,
			{
				headers: {
					Authorization: `Bearer ${token.refreshToken}`,
				},
			}
		);

		console.log(response);

		const tokens = await response.json();

		console.log(tokens);

		if (!response.ok) {
			throw tokens;
		}

		/*const refreshedTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/

		//return token;

		return {
			...token,
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}
const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				token: {},
			},
			async authorize(credentials) {
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
			console.log({ token, user });
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}
			return refreshAccessToken(token);
		},
		async session({ session, token }: { session: any; token: any }) {
			// Attach the JWT token and user details to the session
			session.accessToken = token.token.accessToken;
			session.refreshToken = token.token.refreshToken;
			session.isLoggedIn = true;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
