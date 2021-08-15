import Frisbee from 'frisbee';

// create a new instance of Frisbee
export const api = new Frisbee({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
