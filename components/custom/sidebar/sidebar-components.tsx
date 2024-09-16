'use client';
import { DynamicIcon } from '@/components/actions';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
// import { menu } from '@/lib/dummy-data';
import { useGetSidebarPrivetQuery } from '@/lib/features/sidebar/apiSlice';
import { MenuType } from '@/lib/type';

import Link from 'next/link';

export function MenuItem() {
	const { data, isLoading, isError } = useGetSidebarPrivetQuery();
	if (isLoading) {
		return Array.from({ length: 10 }, (_, i) => (
			<div key={i}>
				<Skeleton className="h-10 w-full mt-4" />
				<Skeleton className="h-10 w-[90%] mt-4" />
			</div>
		));
	}

	if (!isLoading && isError) {
		return <div>Something went wrong</div>;
	}
	return data?.data?.sidebar?.map(
		(e: MenuType) =>
			e.show && (
				<div key={e?._id}>
					{e.title && e.show && (
						<h1 className="mb-2 font-semibold text-sm sm:text-base">
							{e.title}
						</h1>
					)}
					{e.show &&
						e.sidebarChildren &&
						e.sidebarChildren.map((subItem) => {
							return subItem.children &&
								subItem.children?.length > 0 &&
								subItem.show &&
								subItem.children ? (
								<Accordion
									key={subItem._id}
									type="single"
									collapsible
									className="w-full"
								>
									<AccordionItem
										key={subItem._id}
										value={`item-${subItem._id}`}
										className="hover:bg-muted border-b-0 w-full rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3 "
									>
										<AccordionTrigger className="hover:no-underline p-0">
											<p className="flex items-center gap-3 text-xs sm:text-sm">
												<DynamicIcon icon={subItem.icon} className="h-4 w-4" />
												{subItem.name}
											</p>
										</AccordionTrigger>
										<AccordionContent className="pb-0 mt-2">
											{subItem.children.map(
												(subChild) =>
													subItem?.children &&
													subItem?.children?.length > 0 &&
													subChild.show && (
														<Link
															key={subChild._id}
															href={subChild.path as string}
															className="hover:bg-muted  flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary text-xs sm:text-sm"
														>
															<DynamicIcon
																icon="CircleDotDashed"
																className="h-4 w-4"
															/>
															{subChild.name}
														</Link>
													)
											)}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							) : (
								subItem.show && (
									<Link
										key={subItem._id}
										href={subItem.path as string}
										className="hover:bg-muted flex items-center gap-3 my-1 sm:my-2 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary text-xs sm:text-sm"
									>
										<DynamicIcon icon={subItem.icon} className="h-4 w-4" />
										{subItem.name}
									</Link>
								)
							);
						})}
					{e.hr && <hr className="my-1 sm:my-3" />}
				</div>
			)
	);
}
