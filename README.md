[ http://localhost:8080](http://localhost:8080)
https://dreamspos.dreamstechnologies.com/html/template/blank-page.html
https://zod.dev/
https://www.npmjs.com/package/@hookform/resolvers
https://react-hook-form.com/get-started

## Type use from Frontend then copy to backend

<form onSubmit={handleSubmit(onSubmit)}>
				{/* Form fields */}
				<div>
					<label>Name</label>
					<Controller
						name="name"
						control={control}
						render={({ field }) => <input {...field} />}
					/>
				</div>
				<div>
					<label>Status</label>
					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<select {...field}>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						)}
					/>
				</div>
				<button type="button" onClick={() => dispatch(addRoute())}>
					Add Route
				</button>
				{formState.routes.map((route, routeIndex) => (
					<div key={route.id}>
						<h3>Route {routeIndex + 1}</h3>
						<button
							type="button"
							onClick={() => dispatch(removeRoute({ routeId: route.id }))}
						>
							Remove Route
						</button>
						{/* Route fields */}
						<div>
							<label>Route Name</label>
							<Controller
								name={`routes[${routeIndex}].name`}
								control={control}
								render={({ field }) => <input {...field} />}
							/>
						</div>
						<div>
							<label>Route Status</label>
							<Controller
								name={`routes[${routeIndex}].status`}
								control={control}
								render={({ field }) => (
									<select {...field}>
										<option value="active">Active</option>
										<option value="inactive">Inactive</option>
									</select>
								)}
							/>
						</div>
						<button
							type="button"
							onClick={() => dispatch(addAction({ routeId: route.id }))}
						>
							Add Action
						</button>
						{route.actions.map((action, actionIndex) => (
							<div key={action.id}>
								<h4>Action {actionIndex + 1}</h4>
								<button
									type="button"
									onClick={() =>
										dispatch(
											removeAction({ routeId: route.id, actionId: action.id })
										)
									}
								>
									Remove Action
								</button>
								{/* Action fields */}
								<div>
									<label>Action Name</label>
									<Controller
										name={`routes[${routeIndex}].actions[${actionIndex}].name`}
										control={control}
										render={({ field }) => <input {...field} />}
									/>
								</div>
								<div>
									<label>Action Status</label>
									<Controller
										name={`routes[${routeIndex}].actions[${actionIndex}].status`}
										control={control}
										render={({ field }) => (
											<select {...field}>
												<option value="active">Active</option>
												<option value="inactive">Inactive</option>
											</select>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				))}
				<button type="submit">Submit</button>
			</form>

    result
    				? [
    						...result.map(({ _id }) => ({
    							type: 'DevPermission' as const,
    							_id,
    						})),
    						'DevPermission',
    					]
    				: ['DevPermission'],
