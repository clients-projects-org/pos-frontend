import { jwtDecode } from 'jwt-decode';

// Function to decode JWT
export async function decodeJwt(token: any) {
	try {
		const decoded = jwtDecode(token);
		return decoded;
	} catch (error) {
		console.error('Error decoding JWT:', error);
		return null;
	}
}
