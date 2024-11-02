import { Metadata } from 'next';
import { SidebarNav } from './components/sidebar-nav';
import { Separator } from '@/components/ui/separator';
import PageTitle from '@/components/custom/PageTitle';

export const metadata: Metadata = {
	title: 'Forms',
	description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
	{
		title: 'Profile',
		href: '/settings/general',
	},
	{
		title: 'User',
		href: '/settings/general/user',
	},
	{
		title: 'Account',
		href: '/settings/general/account',
	},
	{
		title: 'Appearance',
		href: '/settings/general/appearance',
	},
	{
		title: 'Notifications',
		href: '/settings/general/notifications',
	},
	{
		title: 'Display',
		href: '/settings/general/display',
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<PageTitle title="Settings" />

			<div className="space-y-6 pb-16    ">
				<div className=" flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className=" lg:w-1/5">
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className="flex-1 lg:max-w-2xl">{children}</div>
				</div>
			</div>
		</>
	);
}
