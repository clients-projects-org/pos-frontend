import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { menu } from '@/lib/dummy-data';
import { IconType, MenuType } from '@/lib/type';
import * as Ic from 'lucide-react';

import Link from 'next/link';

export function MenuItem() {
	return menu.map((e: MenuType, i) => (
		<div key={i}>
			{e.title && <h1 className="mb-2 font-semibold">{e.title}</h1>}
			{e.children.map((subItem) => {
				const IconComponent =
					subItem.icon && (Ic as unknown as IconType)[subItem.icon];
				// const IconComponent = subItem.icon && iconMap[subItem.icon];
				return subItem.children ? (
					<Accordion
						key={subItem.id}
						type="single"
						collapsible
						className="w-full"
					>
						<AccordionItem
							key={subItem.id}
							value={`item-${subItem.id}`}
							className="hover:bg-muted border-b-0 w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary my-3"
						>
							<AccordionTrigger className="hover:no-underline p-0">
								<p className="flex items-center gap-3 ">
									{IconComponent && <IconComponent className="h-4 w-4" />}
									{subItem.name}
								</p>
							</AccordionTrigger>
							<AccordionContent className="pb-0 mt-2">
								{subItem.children.map((subChild) => (
									<Link
										key={subChild.id}
										href={subChild.path as string}
										className="hover:bg-muted  flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
									>
										<Ic.CircleDotDashed className="h-4 w-4" />
										{subChild.name}
									</Link>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				) : (
					<Link
						key={subItem.id}
						href={subItem.path as string}
						className="hover:bg-muted flex items-center gap-3 my-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						{IconComponent && <IconComponent className="h-4 w-4" />}
						{subItem.name}
					</Link>
				);
			})}
			{e.hr && <hr className="my-3" />}
		</div>
	));
}
