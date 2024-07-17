import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FInput({
	label,
	id,
	...props
}: {
	label: string;
	id: string;
	[props: string]: any;
}) {
	return (
		<div className="grid w-full items-center gap-2">
			<Label className="capitalize">{label}</Label>
			<Input {...props} />
		</div>
	);
}
