import React from "react";
import { TicketType } from "../../types";
import { TicketTypeRow } from "./TicketTypeRow";
import { formatCurrency } from "../../utils/format";

type CheckoutFormProps = {
  ticketTypes: TicketType[];
};

export const CheckoutForm = ({ ticketTypes }: CheckoutFormProps) => {
  console.log(ticketTypes);
  const initTickets = ticketTypes.reduce((acc, cur) => {
    acc[cur.type] = { qty: 0, cost: cur.cost };
    return acc;
  }, {} as Record<string, { qty: number; cost: number }>);

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

    console.log("form submitted!");
    const filteredTickets = Object.entries(selectedTickets).reduce(
      (acc, [type, ticket]) => {
        if (ticket.qty > 0) acc[type] = ticket.qty;
        return acc;
      },
      {} as Record<string, number>
    );
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
    <form onSubmit={handleSumbit} className="grid gap-8">
      <h2 className="text-2xl font-bold">Select Tickets</h2>

      <section id="ticket-types">
        {ticketTypes.map((t) => (
          <TicketTypeRow
            key={t.type}
            qty={selectedTickets[t.type].qty}
            onQtyChange={handleTicketQtyChange}
            {...t}
          />
        ))}
      </section>

      <p>
        <span>Total</span>
        <span>{formatCurrency(getSelectedTicketTotal())}</span>
      </p>

      <section id="buyer-info">
        <input
          id="firstName"
          name="firstName"
          placeholder="First Name"
          onChange={handleInputChange}
          required
        />
        <input
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          onChange={handleInputChange}
          required
        />
        <input
          id="address"
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          required
        />
      </section>

      <section id="payment-info">
        <input
          id="cardNumber"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          onChange={handleInputChange}
          inputMode="numeric"
          required
          minLength={12}
          maxLength={15} // TODO: amex length?
        />
        <input
          id="cardExpiry"
          name="cardExpiry"
          placeholder="MM/YY"
          onChange={handleInputChange}
          inputMode="numeric"
          required
        />
        <input
          id="cardCvv"
          name="cardCvv"
          placeholder="CVV"
          onChange={handleInputChange}
          inputMode="numeric"
          required
          minLength={3}
          maxLength={4}
        />
      </section>

      <button type="submit">Get Tickets</button>
    </form>
  );
};
