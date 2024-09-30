import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductTypeView } from '../create-product/product.type';

interface DataState {
	selectedData: {
		id: string;
		data: {
			product: ProductTypeView;
		};
	}[];
}

const initialState: DataState = {
	selectedData: [],
};

const purchaseProductSlice = createSlice({
	name: 'purchases_products',
	initialState,
	reducers: {
		saveProductData: (
			state,
			action: PayloadAction<{
				id: string;
				data: {
					product: ProductTypeView;
				};
			}>
		) => {
			// Check if the data for the ID already exists
			const existingIndex = state.selectedData.findIndex(
				(item) => item.id === action.payload.id
			);
			if (existingIndex === -1) {
				// Add new data if not already present
				state.selectedData.push(action.payload);
			}
		},
	},
});

export const { saveProductData } = purchaseProductSlice.actions;
export default purchaseProductSlice;
