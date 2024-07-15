import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const SelectStatus = ({
	onChange,
	placeholder,
	items,
}: {
	placeholder: string;
	onChange: (value: string) => void;
	items: 'actDeDraft';
}) => {
	const options = {
		actDeDraft: [
			{
				value: 'active',
				label: 'Active',
			},
			{
				value: 'deactivated',
				label: 'Deactivated',
			},
			{
				value: 'draft',
				label: 'Draft',
			},
		],
	};

	return (
		<Select onValueChange={onChange}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options[items].map((item) => (
						<SelectItem key={item.value} value={item.value.toString()}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export { SelectStatus };
