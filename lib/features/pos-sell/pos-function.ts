import { ProductType } from '@/lib/type';

// calculate discount by product
const discount = (product: ProductType) => {
	if (product.discount_type === 'fixed') {
		return product.sell_price - product.discount_value;
	} else if (product.discount_type === 'percentage') {
		return (
			product.sell_price -
			Math.round((product.discount_value * product.sell_price) / 100)
		);
	} else {
		return product.sell_price;
	}
};

export { discount };
