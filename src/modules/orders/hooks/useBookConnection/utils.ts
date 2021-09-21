import { roundDownToInterval } from "../../../../utils";

import { Order } from "../../types";

import { OrdersObj, OrdersState } from "./types";

export function processInitialOrders(orders: Order[]): OrdersObj {
  return Object.fromEntries(orders);
}

function processOrdersDeltas(
  originalList: OrdersObj,
  deltas: Order[]
): OrdersObj {
  const newList = { ...originalList };

  deltas.forEach(([price, size]) => {
    if (size === 0) {
      delete newList[price];
    } else if (size > 0) {
      newList[price] = size;
    }
  });

  return newList;
}

export function handleDeltas(
  originalBook: OrdersState,
  asks: Order[],
  bids: Order[]
): OrdersState {
  return {
    asks: processOrdersDeltas(originalBook.asks, asks),
    bids: processOrdersDeltas(originalBook.bids, bids),
  };
}

export function processOrdersOutput(
  orders: OrdersObj,
  tickSize: number
): Order[] {
  const ordersByTickSize: OrdersObj = {};

  for (const [price, size] of Object.entries(orders)) {
    const roundedPrice = roundDownToInterval(Number(price), tickSize) * 100;
    ordersByTickSize[roundedPrice] = ordersByTickSize[roundedPrice]
      ? ordersByTickSize[roundedPrice] + size
      : size;
  }

  return Object.entries(ordersByTickSize).map(([price, size]) => [
    Number(price) / 100,
    size,
  ]);
}
