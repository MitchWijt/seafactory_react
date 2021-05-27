import { loadStripe } from '@stripe/stripe-js'
const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(stripeKey)
