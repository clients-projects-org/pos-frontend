function generateUniqueId() {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let uniqueId = '';
	for (let i = 0; i < 12; i++) {
		uniqueId += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return uniqueId;
}

export { generateUniqueId };
//  Example output: "A1b2C3d4E5f6"
