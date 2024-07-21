'use client';
import { Card } from '@/components/ui/card';
import { useGetByIdQuery } from './devPermissionSlice';
import { DynamicIcon } from '@/components/actions';
import { status } from '@/lib/actions';
import { DevPermission } from './components';
import { PageDetailsApiHOC } from '@/components/hoc';

export function DevPermissionDetails({ slug }: { slug: string }) {
	const { data, isLoading, error, isFetching, isError } = useGetByIdQuery(slug);

	return (
		<PageDetailsApiHOC
			data={data}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		>
			<div className="mx-auto max-w-5xl w-full border p-4">
				<div>
					<div className="flex justify-between">
						<h5 className="mb-2 underline">Main Title</h5>
						<div>
							<DevPermission.Actions
								data={data?.data}
								type={{
									mainId: data?.data?._id,
									type: 'main',
								}}
							/>
						</div>
					</div>
					<div>
						<h4 className="text-2xl mb-5 ">{data?.data?.name}</h4>
					</div>
					<div className="space-y-4">
						{data?.data?.routes?.map((route: any) => (
							<Card
								key={route._id}
								className={`p-3 space-y-2 ${status(route.status)}`}
							>
								<div className="flex justify-between">
									<h5 className="mb-2 underline">Routes</h5>
									<DevPermission.Actions
										data={route}
										isFor="child"
										type={{
											mainId: data?.data._id,
											routesId: route._id,
											type: 'routes',
										}}
									/>
								</div>
								<div className="flex justify-between">
									<div className="flex gap-2 items-center">
										<DynamicIcon icon={route.image} />
										<h5 className="text-lg capitalize">{route.name}</h5>
									</div>
								</div>
								<div className=" ms-8">
									<Card className="p-3 space-y-2">
										<h5 className="mb-2 underline">Actions</h5>
										{route?.actions?.map((action: any) => (
											<Card
												className={`p-2 space-y-2 ${status(action.status)}`}
												key={action._id}
											>
												<div className="flex justify-between">
													<div className="flex gap-2 items-center">
														<DynamicIcon
															icon={action.image}
															className="h-4 w-4"
														/>
														<h5 className="text-base capitalize">
															{action.name}
														</h5>
													</div>

													<DevPermission.Actions
														data={action}
														isFor="child"
														type={{
															type: 'actions',
															mainId: data?.data._id,
															routesId: route._id,
															actionsId: action._id,
														}}
													/>
												</div>
											</Card>
										))}
									</Card>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</PageDetailsApiHOC>
	);
}
