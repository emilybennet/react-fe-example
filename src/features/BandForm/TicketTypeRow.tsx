import React from "react";
import { TicketType } from "../../types";
import { formatCurrency } from "../../utils/format";
import { Input } from "../../components/Input";

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
  <div className="grid grid-cols-[1fr_100px] items-center gap-4 border-b border-b-gray-400 pb-4 sm:pb-8 sm:gap-8">
    <div>
      <h3 className="text-xl font-medium tracking-tight text-gray-900 sm:text-2xl mb-4">
        {name}
      </h3>
      <p className="text-base mb-4">{description}</p>
      <p className="text-xl">{formatCurrency(cost)}</p>
    </div>

    <Input
      type="number"
      value={qty}
      min={0}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(ev.target.value, 10);
        onQtyChange(type, val);
      }}
    />
  </div>
);
