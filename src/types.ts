export type TicketType = {
  type: string;
  name: string;
  description: string;
  cost: number;
};

export type Band = {
  name: string;
  id: string;
  date: number;
  location: string;
  description_blurb: string;
  imgUrl: string;
  ticketTypes: TicketType[];
};
