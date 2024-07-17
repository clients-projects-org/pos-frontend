import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FInput({
	label,
	id,
	error,
	...props
}: {
	label: string;
	id: string;
	error?: string[];
	[props: string]: any;
}) {
	return (
		<div className="grid w-full items-center gap-2">
			<Label className="capitalize">{label}</Label>
			<Input {...props} />

			<div className="ms-1">
				{error &&
					error?.length > 0 &&
					error?.map((error: string, index: number) => (
						<p key={index} className="text-destructive">
							{error}
						</p>
					))}
			</div>
		</div>
	);
}
