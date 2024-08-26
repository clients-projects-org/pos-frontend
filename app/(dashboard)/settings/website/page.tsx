'use client';
import PageTitle from '@/components/custom/PageTitle';
import React from 'react';
import { DynamicIcon } from '@/components/actions';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { MenuType } from '@/lib/type';
import { Switch } from '@/components/ui/switch';
import { SidebarStore } from '@/lib/features/sidebar/SidebarStore';
import { env } from '@/lib/env';
import {
	useGetSidebarQuery,
	useUpdateSidebarStatusMutation,
} from '@/lib/features/sidebar/apiSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';

export default function WebsiteSetting() {
	const { data, isLoading, isError, isFetching } = useGetSidebarQuery();
	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateSidebarStatusMutation();

	if (isLoading) {
		return Array.from({ length: 10 }, (_, i) => (
			<div key={i}>
				<Skeleton key={i} className="h-10 w-full mt-4" />
				<Skeleton key={i} className="h-10 w-[90%] mt-4" />
			</div>
		));
	}

	if (!isLoading && isError) {
		return <div>Something went wrong</div>;
	}

	const handleSwitch = async ({
		id,
		type,
		status,
	}: {
		id: string;
		type: {
			type: 'main' | 'sidebarChildren' | 'children';
			mainID?: string;
			sidebarChildrenID?: string;
			childrenID?: string;
		};
		status: boolean;
	}) => {
		await updateStatus({ id, status, type }).unwrap();

		console.log(id, type, status);
	};
	return (
		<>
			<PageTitle title="Website Settings" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<div className="max-w-lg shadow-lg ms-11">
						{data?.data?.map((e: MenuType) => (
							<div
								key={e._id}
								className={`p-2 rounded ${e.show ? '' : 'bg-slate-300 dark:bg-slate-500'}`}
							>
								{e.title && (
									<div className={`flex   gap-1 items-center `}>
										<h1 className=" font-semibold text-sm sm:text-base">
											{e.title}
										</h1>
										<Switch
											onCheckedChange={(c) =>
												handleSwitch({
													id: e._id,
													status: c,
													type: {
														type: 'main',
														mainID: e._id,
													},
												})
											}
											checked={e.show}
											className="scale-75"
										/>
									</div>
								)}
								{e.sidebarChildren?.map((subItem) => {
									return subItem.children?.length > 0 && subItem.children ? (
										<Accordion
											key={subItem._id}
											type="single"
											collapsible
											className="w-full"
										>
											<AccordionItem
												key={subItem._id}
												value={`item-${subItem._id}`}
												className={`hover:bg-muted border-b-0 w-full rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3  ${subItem.show ? '' : 'bg-slate-300 dark:bg-slate-500'}`}
											>
												<div className={`flex items-center justify-between `}>
													<AccordionTrigger className="hover:no-underline p-0 flex-1">
														<p className="flex items-center gap-3 text-xs sm:text-sm">
															<DynamicIcon
																icon={subItem.icon}
																className="h-4 w-4"
															/>
															{subItem.name}
														</p>
													</AccordionTrigger>
													<Switch
														disabled={!e.show || updateStatusLoading}
														checked={subItem.show}
														className="scale-75"
														onCheckedChange={(c) =>
															handleSwitch({
																id: e._id,
																status: c,
																type: {
																	type: 'sidebarChildren',
																	mainID: e._id,
																	sidebarChildrenID: subItem._id,
																},
															})
														}
													/>
												</div>
												<AccordionContent className="pb-0 mt-2">
													{subItem.children.map((subChild) => (
														<p
															key={subChild._id}
															className={`hover:bg-muted justify-between  flex items-center gap-3 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary text-xs sm:text-sm ${subChild.show ? '' : 'bg-slate-300 dark:bg-slate-500'}`}
														>
															<span className="flex items-center gap-3">
																<DynamicIcon
																	icon="CircleDotDashed"
																	className="h-4 w-4"
																/>
																{subChild.name}
															</span>
															<Switch
																checked={subChild.show}
																className="scale-75"
																disabled={
																	!subItem.show ||
																	!e.show ||
																	updateStatusLoading
																}
																onCheckedChange={(c) =>
																	handleSwitch({
																		id: e._id,
																		status: c,
																		type: {
																			type: 'children',
																			mainID: e._id,
																			sidebarChildrenID: subItem._id,
																			childrenID: subChild._id,
																		},
																	})
																}
															/>
														</p>
													))}
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									) : (
										<p
											key={subItem._id}
											className={`hover:bg-muted  flex justify-between items-center gap-3 my-1 sm:my-2 rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary text-xs sm:text-sm ${subItem.show ? '' : 'bg-slate-300 dark:bg-slate-500'}`}
										>
											<span className="flex items-center gap-3">
												<DynamicIcon icon={subItem.icon} className="h-4 w-4" />
												{subItem.name}
											</span>
											<Switch
												disabled={!e.show || updateStatusLoading}
												checked={subItem.show}
												className="scale-75"
												onCheckedChange={(c) =>
													handleSwitch({
														id: e._id,
														status: c,
														type: {
															type: 'sidebarChildren',
															mainID: e._id,
															sidebarChildrenID: subItem._id,
														},
													})
												}
											/>
										</p>
									);
								})}

								{env.env === 'development' && (
									<div className="text-center">
										<SidebarStore data={e} />
									</div>
								)}
								{e.hr && <hr className="my-1 sm:my-3" />}
							</div>
						))}
					</div>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
