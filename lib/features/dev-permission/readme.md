<!-- view  -->

```ts
{/* permissions title*/}
			{!devPermission.isLoading && devPermission.data?.success && (
				<>
					<PageTitleNoBack title="Permissions">
						{/* <Link
							href={'/user-management/roles-permissions/create-permission'}
							className="gap-1 flex items-center"
						>
							<DynamicIcon icon="PlusCircle" className="h-4 w-4 ml-0" />
							<span className="sr-only sm:not-sr-only !whitespace-nowrap">
								Add Permissions
							</span>
						</Link> */}
						<DevNameStoreModal />
					</PageTitleNoBack>

					{/* filter  */}
					<DevPermission.Filter value={value} setValue={setValue} />
				</>
			)}

			<ApiUseHOC
				data={devPermission.data}
				isFetching={devPermission.isFetching}
				isLoading={devPermission.isLoading}
				notFound
			>
				{!isEmptyArray(devPermission.data?.data) && (
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
						{devPermission.data?.data?.map((dev: DevPermissionType) => (
							<Motion key={dev._id}>
								<div className="text-gray-900 px-4 py-2  border rounded-lg    dark:text-white">
									<div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between">
										<Link
											href={`/user-management/roles-permissions/permission-${dev._id}`}
											className="capitalize"
										>
											{dev.name}
										</Link>
										<DevPermission.Actions data={dev} />
									</div>

									{isEmptyArray(dev.routes) && (
										<p className="text-sm  text-stone-500">No Routes</p>
									)}

									{/* routes list items  */}
									{dev.routes?.map((route: DevRouteType) => (
										<ListItem key={route._id} data={route} />
									))}
								</div>
							</Motion>
						))}
					</div>
				)}
			</ApiUseHOC>

```
