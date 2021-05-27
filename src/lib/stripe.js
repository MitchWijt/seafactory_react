import { loadStripe } from '@stripe/stripe-js'
import config from '../config'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(config.REACT_APP_STRIPE_PUBLISHABLE_KEY)
