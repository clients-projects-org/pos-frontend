import { useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// or scss:
export function CropDemo({ src }) {
	const [crop, setCrop] = useState<Crop>();
	return (
		<ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
			<img src={src} />
		</ReactCrop>
	);
}
