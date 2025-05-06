import React from "react";
import { TriangleAlert } from "lucide-react";

import { TicketType } from "../../types";
import { TicketTypeRow } from "./TicketTypeRow";
import { formatCurrency } from "../../utils/format";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";

type CheckoutFormProps = {
  ticketTypes: TicketType[];
};

export const CheckoutForm = ({ ticketTypes }: CheckoutFormProps) => {
  const initTickets = ticketTypes.reduce((acc, cur) => {
    acc[cur.type] = { qty: 0, cost: cur.cost };
    return acc;
  }, {} as Record<string, { qty: number; cost: number }>);

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [selectedTickets, setSelectedTickets] = React.useState(initTickets);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleSumbit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Reset Errors.
    setErrors({});

    console.log("form submitted!");
    const filteredTickets = Object.entries(selectedTickets).reduce(
      (acc, [type, ticket]) => {
        if (ticket.qty > 0) acc[type] = ticket.qty;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log(filteredTickets);

    // Quick check to confirm at least 1 ticket is being bought.
    if (Object.keys(filteredTickets).length < 1) {
      setErrors({ ticketTypes: "Please select at least 1 ticket." });
      console.error("No ticket types selected!");
      return;
    }

    const payload = {
      tickets: filteredTickets,
      buyer: {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
      },
      payment: {
        cardNumber: form.cardNumber,
        cardExpiry: form.cardExpiry,
        cardCvv: form.cardCvv,
      },
    };
    console.log(payload);
  };

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketQtyChange = (type: string, qty: number) => {
    setSelectedTickets((prev) => {
      const next = { ...prev[type], qty };
      return { ...prev, [type]: next };
    });
  };

  const getSelectedTicketTotal = () => {
    return Object.entries(selectedTickets).reduce(
      (acc, [_, { qty, cost }]) => acc + qty * cost,
      0
    );
  };

  return (
    <form
      onSubmit={handleSumbit}
      className="grid gap-8 bg-gray-50 rounded-lg ring-1 ring-gray-950/10 px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-12"
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Select Tickets
      </h2>

      {errors.ticketTypes && (
        <p
          id="ticket-qty-error"
          className="flex gap-2 items-center text-red-600"
        >
          <TriangleAlert /> {errors.ticketTypes}
        </p>
      )}

      <section id="ticket-types" className="grid gap-4 sm:gap-8">
        {ticketTypes.map((t) => (
          <TicketTypeRow
            key={t.type}
            qty={selectedTickets[t.type].qty}
            onQtyChange={handleTicketQtyChange}
            {...t}
          />
        ))}
      </section>

      <p className="text-2xl flex justify-between">
        <span>Total</span>
        <span>{formatCurrency(getSelectedTicketTotal())}</span>
      </p>

      <section id="buyer-info" className="grid gap-4">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-4 sr-only">
          Contact Details
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
            required
          />
        </div>
      </section>

      <section id="payment-info" className="grid gap-4">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-4">
          Payment Details
        </h3>

        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            onChange={handleInputChange}
            inputMode="numeric"
            required
            minLength={12}
            maxLength={15} // TODO: amex length?
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cardExpiry">Expiry</Label>
            <Input
              id="cardExpiry"
              name="cardExpiry"
              placeholder="MM/YY"
              onChange={handleInputChange}
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <Label htmlFor="cardCvv">CVV</Label>
            <Input
              id="cardCvv"
              name="cardCvv"
              placeholder="CVV"
              onChange={handleInputChange}
              inputMode="numeric"
              required
              minLength={3}
              maxLength={4}
            />
          </div>
        </div>
      </section>

      <Button type="submit">Get Tickets</Button>
    </form>
  );
};
