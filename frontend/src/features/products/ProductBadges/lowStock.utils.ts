import { UI_CONSTANTS } from "../../../constants/ui";

export const isLowStock = (quantity: number): boolean =>
  quantity <= UI_CONSTANTS.LOW_STOCK_THRESHOLD;
