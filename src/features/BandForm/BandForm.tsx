import DOMPurify from "dompurify";
import { CalendarDays, MapPin } from "lucide-react";

import { Band } from "../../types";
import { formatDisplayDate } from "../../utils/format";
import { CheckoutForm } from "./CheckoutForm";

type BandFormProps = {
  band: Band;
};

export const BandForm = ({ band }: BandFormProps) => {
  return (
    <div className="mx-auto max-w-2xlZ w-full px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          {band.name}
        </h1>
        <ul className="text-base text-gray-600">
          <li className="flex gap-2 mb-2">
            <CalendarDays aria-hidden="true" />
            {formatDisplayDate(band.date)}
          </li>
          <li className="flex gap-2">
            <MapPin aria-hidden="true" />
            {band.location}
          </li>
        </ul>
      </header>

      <main className="grid md:grid-cols-2 gap-4 lg:gap-12">
        <div className="band-info mb-8">
          <img src={band.imgUrl} alt={band.name} className="mb-8" />

          <div
            className="band-blurb"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(band.description_blurb),
            }}
          />
        </div>

        <CheckoutForm ticketTypes={band.ticketTypes} />
      </main>
    </div>
  );
};
