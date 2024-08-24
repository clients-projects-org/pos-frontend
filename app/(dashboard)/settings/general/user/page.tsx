import PageTitle from '@/components/custom/PageTitle';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function GeneralSettingsUser() {
	return (
		<>
			<PageTitle title="User Settings" />
			<div>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">NO</legend>
					<div className="grid grid-cols-2 gap-3">
						<div className="grid gap-3">
							<Label htmlFor="role">Size</Label>
							<Select defaultValue="system">
								<SelectTrigger>
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="system">System</SelectItem>
									<SelectItem value="user">User</SelectItem>
									<SelectItem value="assistant">Assistant</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="role">Size</Label>
							<Select defaultValue="system">
								<SelectTrigger>
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="system">System</SelectItem>
									<SelectItem value="user">User</SelectItem>
									<SelectItem value="assistant">Assistant</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</fieldset>
			</div>
		</>
	);
}
