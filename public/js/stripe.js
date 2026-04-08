import axios from 'axios';
import { showAlert } from './alert';
const stripe = require('stripe')(
  'pk_test_51THOtVIfTD7A7kHjREk6XSlR4LJk8caE1BmZqbADK5OuvSjkqcorJj7wVgBEo4IBN84k0wdKN9jH378T2jtTO7Xb00LcgUAeXt',
);
export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    window.location.href = session.data.session.url;
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
