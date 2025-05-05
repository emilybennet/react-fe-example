import { Band } from "../../types";
import { CheckoutForm } from "./CheckoutForm";

type BandFormProps = {
  band: Band;
};

export const BandForm = ({ band }: BandFormProps) => {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-6xl font-bold">{band.name}</h1>
        <ul>
          <li>{band.date}</li>
          <li>{band.location}</li>
        </ul>
      </header>

      <div className="band-info mb-8">
        <img src={band.imgUrl} alt={band.name} />

        <h2 className="text-2xl font-bold">TODO: SANITIZE THIS DESC</h2>
        {band.description_blurb}
      </div>

      <CheckoutForm ticketTypes={band.ticketTypes} />
    </main>
  );
};
