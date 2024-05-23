'use client';
import PageTitle from '@/components/custom/PageTitle';
import { Modal } from '@/components/modal';
import { useGetRolesQuery } from '@/lib/features/role';
import { TableBox } from '@/lib/table';
import { roleColumn, roleData } from '@/lib/table/table-details';

import { RoleType } from '@/lib/type';

export default function RoleAndPermissions() {
	const { data } = useGetRolesQuery();
	console.log(data);
	return (
		<>
			<PageTitle title="Role & Permissions" />
			<TableBox<RoleType> columns={roleColumn} data={roleData} />
			<Modal />
		</>
	);
}
