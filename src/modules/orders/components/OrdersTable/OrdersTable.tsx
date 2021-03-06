import React from "react";
import { useWindowWidth } from "@react-hook/window-size";
import classes from "./OrdersTable.module.css";
import { Order } from "../../types";

function addTotalToOrders(orders: Order[]) {
  let currentTotal = 0;

  const ordersWithTotal = orders.map(([price, size]) => {
    currentTotal = currentTotal + size;
    return {
      price,
      size,
      total: currentTotal,
    };
  });

  return {
    ordersWithTotal,
    tableTotal: currentTotal,
  };
}

const numberFormatter = new Intl.NumberFormat();
const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});

export default function OrdersTable({
  type,
  orders,
}: {
  type: "bids" | "asks";
  orders: Order[];
}): JSX.Element {
  const windowWidth = useWindowWidth();

  const isBidsTable = type === "bids";

  const { ordersWithTotal, tableTotal } = addTotalToOrders(orders);

  return (
    <table className={`${classes.table} ${classes[type]}`}>
      <thead className={classes.tableHeader}>
        <tr>
          <th>Price</th>
          <th>Size</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {ordersWithTotal.map(({ total, size, price }) => {
          const totalPercentage = `${(total / tableTotal) * 100}%`;

          return (
            <tr
              data-testid={`order-row-${type}-${price}`}
              key={price}
              style={{
                background: `
                  linear-gradient(
                    ${!isBidsTable && windowWidth > 0 ? "to right" : "to left"},
                    ${isBidsTable ? "#3e212c" : "#103839"} ${totalPercentage},
                    transparent ${totalPercentage}
                  )`,
              }}
            >
              <td
                data-testid="price"
                style={{ color: `${isBidsTable ? "red" : "green"}` }}
              >
                {priceFormatter.format(Number(price))}
              </td>
              <td data-testid="size">{numberFormatter.format(size)}</td>
              <td data-testid="total">{numberFormatter.format(total)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
