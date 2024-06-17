'use client';
import React, { forwardRef } from 'react';
import {
	ImageRestriction,
	FixedCropper,
	FixedCropperRef,
	FixedCropperProps,
} from 'react-advanced-cropper';

export type CustomCropperProps = FixedCropperProps;

export type CustomCropperRef = FixedCropperRef;

export const CustomCropper = forwardRef<CustomCropperRef, CustomCropperProps>(
	({ stencilProps, ...props }: CustomCropperProps, ref) => {
		return (
			<FixedCropper
				ref={ref}
				src={
					'https://images.pexels.com/photos/5006465/pexels-photo-5006465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
				}
				stencilProps={{
					handlers: false,
					lines: false,
					movable: false,
					resizable: false,
					...stencilProps,
				}}
				imageRestriction={ImageRestriction.stencil}
				{...props}
			/>
		);
	}
);

CustomCropper.displayName = 'CustomCropper';
