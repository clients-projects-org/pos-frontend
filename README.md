[ http://localhost:8080](http://localhost:8080)
https://dreamspos.dreamstechnologies.com/html/template/blank-page.html
https://pos27.skymoonlabs.com/product/create

https://v0.dev/r/qeiIKxe0hwn 

multi select page
https://shadcnui-expansions.typeart.cc/docs/multiple-selector
https://zod.dev/
https://www.npmjs.com/package/@hookform/resolvers
https://react-hook-form.com/get-started
https://v0.dev/t/8f9c1eZPrb5

```html
<!-- template top -->
@@include('../partials/_templateTop.html')
<!-- header -->
@@include('../partials/_header.html')

<!-- breadcrumb -->
@@include('../partials/_breadcrumb.html', { "breadcrumbText": "Practice Area
Details" })

```
const FormMutation = ({
	methods,
	onSubmit,
	isLoading,
	type,
	roles,
	watching,
}: FormProps) => {
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={methods.control}
							name="image_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image or Icon</FormLabel>
									<FormControl>
										<ImageIcoRadio {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{watching.image_type === 'image' ? (
							<RFImage<FormValues>
								methods={methods}
								imageInfo={userStoreImageInfo}
							/>
						) : (
							<div className="space-y-2   ">
								<RFIcon methods={methods} label={false} />
							</div>
						)}
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<RFInput
									label="User Name"
									methods={methods}
									name="name"
									placeholder="User Name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFStatus methods={methods} name="status" />
							</div>
						</div>
						{/* Email */}
						<div className="grid grid-cols-2 gap-3">
							<RFInput
								label="Email"
								methods={methods}
								name="email"
								placeholder="Email"
							/>
							<RFInput
								label="Phone"
								methods={methods}
								name="phone"
								placeholder="Phone"
							/>
						</div>
						<div className="grid grid-cols-12 gap-3">
							{/* password  */}
							{type === 'create' && (
								<div className="col-span-6">
									<RFInput
										label="Password"
										methods={methods}
										name="password"
										placeholder="Password"
									/>
								</div>
							)}
							{/* Permission  */}
							<div className="col-span-6">
								<RFSelect
									methods={methods}
									data={roles}
									label="Role"
									name="role_id"
								>
									<SelectGroup>
										<SelectLabel>Role All List</SelectLabel>
										{roles?.map((item: RoleType) => (
											<SelectItem
												className="capitalize"
												value={item._id ? item._id : ''}
											>
												{item.name}
											</SelectItem>
										))}
									</SelectGroup>
								</RFSelect>
							</div>
						</div>

						<RFTextarea methods={methods} />

						<div className="flex justify-end gap-3">
							<Link href="/user-management/users">
								<Button
									disabled={isLoading}
									variant="destructive"
									type="button"
								>
									Cancel
								</Button>
							</Link>
							<Button disabled={isLoading} variant="default" type="submit">
								{isLoading
									? type === 'create'
										? 'Creating...'
										: 'Updating...'
									: type === 'create'
										? 'Create New'
										: 'Update Changes'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
};
```

```ts
<div className="max-w-5xl mx-auto w-full border p-4 rounded">
				<FormProvider {...methods}>
					<Form {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							className="space-y-3"
						>
							<FormField
								control={methods.control}
								name="image_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image or Icon</FormLabel>
										<FormControl>
											<ImageIcoRadio {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{watching.image_type === 'image' ? (
								<RFImage<FormValues>
									methods={methods}
									imageInfo={userStoreImageInfo}
								/>
							) : (
								<div className="space-y-2   ">
									<RFIcon methods={methods} label={false} />
								</div>
							)}
							<div className="grid grid-cols-12 gap-3">
								{/* Name */}
								<div className="col-span-8">
									<RFInput
										label="User Name"
										methods={methods}
										name="name"
										placeholder="User Name"
									/>
								</div>

								{/* Status */}
								<div className="col-span-4">
									<RFStatus methods={methods} name="status" />
								</div>
							</div>
							{/* Email */}
							<div className="grid grid-cols-2 gap-3">
								<RFInput
									label="Email"
									methods={methods}
									name="email"
									placeholder="Email"
								/>
								<RFInput
									label="Phone"
									methods={methods}
									name="phone"
									placeholder="Phone"
								/>
							</div>
							<div className="grid grid-cols-12 gap-3">
								{/* Permission  */}
								<div className="col-span-6">
									<RFSelect
										methods={methods}
										data={roles.data?.data}
										label="Role"
										name="role_id"
									>
										<SelectGroup>
											<SelectLabel>Role All List</SelectLabel>
											{roles.data?.data?.map((dev: DevPermissionType) => (
												<SelectItem
													className="capitalize"
													value={dev._id ? dev._id : ''}
												>
													{dev.name}
												</SelectItem>
											))}
										</SelectGroup>
									</RFSelect>
								</div>
							</div>

							<RFTextarea methods={methods} />

							<div className="flex justify-end gap-3">
								<Link href="/user-management/users">
									<Button
										disabled={isLoading}
										variant="destructive"
										type="button"
									>
										Cancel
									</Button>
								</Link>
								<Button disabled={isLoading} variant="default" type="submit">
									{isLoading ? 'Updating...' : 'Update User'}
								</Button>
							</div>
						</form>
					</Form>
				</FormProvider>
			</div>
```

<!-- practice details section -->
<section class="py-120">
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<h4
					class="fs--28 fw--400 wow splite-text animate__animated animate__fadeInUp"
				>
					The most successful and well-known lawyers.
				</h4>
				<p
					class="mb-40 fs--18 fw--400 wow splite-text animate__animated animate__fadeInUp"
				>
					Democracy must be built through open societies that share
					information. when there is information, there is enlightenment. when
					there is debate, there are solutions. when there is no sharing of
					power, no rule of law, no accountability, there is abuse aliquip ex
					commodo consequat.
				</p>
				<p
					class="mb-4 fs--18 fw--400 wow splite-text animate__animated animate__fadeInUp"
				>
					The power of the lawyer is in the uncertainty of the law. lorem ipsum
					dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua.
				</p>
				<div
					class="wow animate__animated animate__fadeInUp"
					data-wow-delay="0.2s"
				>
					<img
						src="assets/images/common/practice-area.png"
						alt="practice-area"
					/>
				</div>

				<div class="row">
					<div class="col-md-6">
						<div class="practice-details-list">
							<div class="icon">
								<i class="fa-solid fa-scale-balanced"></i>
							</div>
							<div>
								<h6 class="fs--22 mb-2 fw--400">Legal Champion</h6>
								<p class="fs--16 fw--400">
									Consectetur adipiscing elit, sed do eiusm od tempor incididunt
									ut labore.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-6"></div>
				</div>
			</div>
			<div class="col-md-4"></div>
		</div>
	</div>
</section>

<!-- faq  -->
<section class="faq-section py-100 position-relative">
	<div class="container">
		<div class="row gy-5 justify-content-center pt-120">
			<div class="col-xl-7 col-lg-8 col-md-10">
				<div
					class="section-content-4 d-flex justify-content-center flex-column align-items-center mb-60"
				>
					<h6
						class="title wow animate__animated animate__fadeInUp text-center fs--48 fw--700 splite-text"
						data-splitting
						data-wow-delay="0.2s"
					>
						Our Easy Work Process
					</h6>
					<p
						class="subtitle wow animate__animated animate__fadeInUp text-center fs-16 fw--400 w--80"
						data-wow-delay="0.3s"
					>
						For whatever matters most, make it easier for potential customers to
						find your business with adline Ads.
					</p>
				</div>
			</div>
		</div>

		<div class="row gy-5 justify-content-center position-relative">
			<div class="col-md-12">
				<div
					class="accordion custom--accordion1 accordion-flush"
					id="accordionFlushExample"
				>
					<div
						class="accordion-item wow animate__fadeInUp animate__animated"
						data-wow-delay="0.2s"
					>
						<div class="accordion-header">
							<div class="bar"></div>
							<button
								class="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapse1"
								aria-expanded="false"
								aria-controls="flush-collapse1"
							>
								Is Two-Factor Authentication
							</button>
						</div>
						<div
							id="flush-collapse1"
							class="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div class="accordion-body">
								only five centuries, but also the leap into electronic
								typesetting, remaining essentially unchanged. It was popularised
								in the with the release of Letraset sheets containing
							</div>
						</div>
					</div>

					<div
						class="accordion-item wow animate__fadeInUp animate__animated"
						data-wow-delay="0.3s"
					>
						<div class="accordion-header">
							<div class="bar"></div>
							<button
								class="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapse2"
								aria-expanded="false"
								aria-controls="flush-collapse2"
							>
								How To Create a Changylab account?
							</button>
						</div>
						<div
							id="flush-collapse2"
							class="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div class="accordion-body">
								In PPC advertising, advertisers bid on keywords relevant to
								their target audience. When users search for those keywords, the
								ad is displayed. Advertisers only pay when someone clicks on
								their ad, directing them to their website or landing page.
							</div>
						</div>
					</div>

					<div
						class="accordion-item wow animate__fadeInUp animate__animated"
						data-wow-delay="0.4s"
					>
						<div class="accordion-header">
							<div class="bar"></div>
							<button
								class="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapse3"
								aria-expanded="false"
								aria-controls="flush-collapse3"
							>
								In which forms can I buy foreign exchange?
							</button>
						</div>
						<div
							id="flush-collapse3"
							class="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div class="accordion-body">
								PPC offers instant visibility for your business, targeted reach,
								and complete control over your budget. It allows you to measure
								the effectiveness of your ads in real-time and make data-driven
								optimizations.
							</div>
						</div>
					</div>

					<div
						class="accordion-item wow animate__fadeInUp animate__animated"
						data-wow-delay="0.5s"
					>
						<div class="accordion-header">
							<div class="bar"></div>
							<button
								class="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapse4"
								aria-expanded="false"
								aria-controls="flush-collapse4"
							>
								How To Exchange Currency?
							</button>
						</div>
						<div
							id="flush-collapse4"
							class="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div class="accordion-body">
								CPM advertising charges advertisers for every 1,000 impressions
								their ad receives, regardless of whether users click on it or
								not. It is particularly useful for brand awareness campaigns and
								reaching a broad audience.
							</div>
						</div>
					</div>

					<div
						class="accordion-item wow animate__fadeInUp animate__animated"
						data-wow-delay="0.6s"
					>
						<div class="accordion-header">
							<div class="bar"></div>
							<button
								class="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapse5"
								aria-expanded="false"
								aria-controls="flush-collapse5"
							>
								How To Exchange Currency?
							</button>
						</div>
						<div
							id="flush-collapse5"
							class="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div class="accordion-body">
								CPM advertising charges advertisers for every 1,000 impressions
								their ad receives, regardless of whether users click on it or
								not. It is particularly useful for brand awareness campaigns and
								reaching a broad audience.
							</div>
						</div>
					</div>

					<div
						class="accordion-item wow animate__fadeInUp animate__animated"
						data-wow-delay="0.7s"
					>
						<div class="accordion-header">
							<div class="bar"></div>
							<button
								class="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapse6"
								aria-expanded="false"
								aria-controls="flush-collapse6"
							>
								How To Exchange Currency?
							</button>
						</div>
						<div
							id="flush-collapse6"
							class="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div class="accordion-body">
								CPM advertising charges advertisers for every 1,000 impressions
								their ad receives, regardless of whether users click on it or
								not. It is particularly useful for brand awareness campaigns and
								reaching a broad audience.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- footer -->
@@include('../partials/_footer.html')
<!-- bottom  -->
@@include('../partials/_templateBottom.html')
```


Product Get All
product-get-all

Product Store
product-store

Product Update
product-update

Product Get Single
product-single

Product Delete
product-delete

Product Status Change
product-status-change