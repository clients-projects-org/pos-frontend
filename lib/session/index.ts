'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Session() {
	const { data: session, status, update } = useSession();

	return {
		session,
		status,
		update,
		signIn,
		signOut,
	};
}
