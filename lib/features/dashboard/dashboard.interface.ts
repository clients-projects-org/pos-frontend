export type AllSettingsType = {
	posStatistics: {
		allTime: {
			totalSalesRevenue: number;
			totalPaid: number;
			totalDue: number;
			totalDiscountValue: number;
			totalTax: number;
			totalQuantity: number;
		};
		today: {
			totalSalesRevenue: number;
			totalPaid: number;
			totalDue: number;
			totalDiscountValue: number;
			totalTax: number;
			totalQuantity: number;
		};
		thisMonth: {
			totalSalesRevenue: number;
			totalPaid: number;
			totalDue: number;
			totalDiscountValue: number;
			totalTax: number;
			totalQuantity: number;
		};
	};
	purchaseStatistics: {
		allTime: {
			totalPurchaseRevenue: number;
			totalPaid: number;
			totalDue: number;
			totalDiscountValue: number;
			totalTax: number;
			totalQuantity: number;
			totalShippingCost: number;
		};
		today: {
			totalPurchaseRevenue: number;
			totalPaid: number;
			totalDue: number;
			totalDiscountValue: number;
			totalTax: number;
			totalQuantity: number;
			totalShippingCost: number;
		};
		thisMonth: {
			totalPurchaseRevenue: number;
			totalPaid: number;
			totalDue: number;
			totalDiscountValue: number;
			totalTax: number;
			totalQuantity: number;
			totalShippingCost: number;
		};
	};
	purchaseStatisticsHistory: {
		allTime: { 
			totalPaid: number; 
		};
		today: { 
			totalPaid: number; 
		};
		thisMonth: { 
			totalPaid: number; 
		};
	};
};
