import React from "react";
import { TicketType } from "../../types";
import { formatCurrency } from "../../utils/format";

type TicketTypeRowProps = TicketType & {
  qty: number;
  onQtyChange: (type: string, qty: number) => void;
};

export const TicketTypeRow = ({
  type,
  name,
  description,
  cost,
  qty,
  onQtyChange,
}: TicketTypeRowProps) => (
  <div className="border-b pb-4">
    TicketTypeRow
    <h3>{name}</h3>
    <p>{description}</p>
    <p>{formatCurrency(cost)}</p>
    <input
      type="number"
      value={qty}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(ev.target.value, 10);
        onQtyChange(type, val);
      }}
    />
  </div>
);
