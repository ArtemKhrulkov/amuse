export type Instrument = {
  id: string;
  nam: string;
};

export type Genre = {
  id: string;
  nam: string;
};

export type User = {
  name: string;
  email: string;
  sex: string;
  avatar: string;
  description: string;
  instruments: Instrument[];
  genres: Genre[];
};
