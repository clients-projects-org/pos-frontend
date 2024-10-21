export function CardLoader({ line = 2 }: { line?: number }) {
	return (
		<div className="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
			<div className="animate-pulse flex space-x-4">
				<div className="rounded-full bg-slate-700 h-10 w-10"></div>
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-slate-700 rounded"></div>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="h-2 bg-slate-700 rounded col-span-2"></div>
							<div className="h-2 bg-slate-700 rounded col-span-1"></div>
						</div>
						{[...Array(line)].map((_, i) => (
							<div key={i} className="h-2 bg-slate-700 rounded"></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
