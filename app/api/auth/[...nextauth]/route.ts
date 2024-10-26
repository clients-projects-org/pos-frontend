import { decodeJwt } from '@/lib/actions';
import { env } from '@/lib/env';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface TokenPayload {
	statusCode: number;
	success: boolean;
	message: string;
	data: {
		accessToken: string;
		refreshToken: string;
	};
}

async function refreshAccessToken(token: any) {
	console.log('refreshAccessToken.refreshToken', token.token.refreshToken);
	try {
		const response = await fetch(`${env.baseApi}auth/refresh-token`, {
			headers: {
				Authorization: `Bearer ${token.token.refreshToken}`,
			},
		});

		const tokens = await response.json();

		console.log(tokens, 'tokens');
		console.log(response, 'response');

		if (!response.ok) {
			console.log(tokens, 'Not ok , tokens');
			throw tokens;
		}

		/*const refreshedTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/

		//return token;
		console.log('return new token ', tokens);
		return {
			accessToken: tokens?.data?.accessToken,
			refreshToken: tokens?.data?.refreshToken ?? token.token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
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
				// const parsedToken =
				// 	credentials?.token &&
				// 	(JSON.parse(credentials.token) as {
				// 		success: boolean;
				// 	});
				const parsedToken: TokenPayload | null =
					credentials?.token && JSON.parse(credentials.token);

				if (credentials?.token && parsedToken?.success) {
					return {
						id: '123',
						token: parsedToken.data,
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
		async jwt({ token, user }: any) {
			if (user) {
				const decodedToken = await decodeJwt(user.token.accessToken);
				// Overwrite iat and exp based on decoded token
				token.iat = decodedToken?.iat;
				token.exp = decodedToken?.exp;
				token.user = {
					token: {
						accessToken: user.token.accessToken,
						refreshToken: user.token.refreshToken,
					},
				};
			}

			const decodedAccessToken = await decodeJwt(token.user.token.accessToken);
			if (decodedAccessToken) {
				if (
					decodedAccessToken.exp &&
					Date.now() / 1000 < decodedAccessToken.exp
				) {
					console.log('valid token', token);
					return token;
				} else {
					console.log('expired token', token);
					const getNewToken = await refreshAccessToken(token.user);
					console.log(getNewToken, 'newToken');
					const decodedToken = await decodeJwt(getNewToken.accessToken);
					console.log(decodedAccessToken, 'decodedAccessToken');
					// Overwrite iat and exp based on decoded token
					token.iat = decodedToken?.iat;
					token.exp = decodedToken?.exp;
					token.user = {
						token: {
							accessToken: getNewToken.accessToken,
							refreshToken: getNewToken.refreshToken,
						},
					};
					return token;
				}
			} else {
				console.log('invalid token');
				// handle invalid token case
				return null;
			}
		},

		async session({ session, token }: { session: any; token: any }) {
			// Attach the JWT token and user details to the session
			console.log(token.user.token, 'token.user.token');
			if (token.user && token.user.token) {
				const decodedToken = await decodeJwt(token.user.token.accessToken);

				if (decodedToken) {
					session.user = {
						...decodedToken,
					};
					delete session.user.iat;
					delete session.user.exp;
				}

				session.isLoggedIn = true;
				session.accessToken = token.user.token.accessToken;
			} else {
				session.isLoggedIn = false;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
