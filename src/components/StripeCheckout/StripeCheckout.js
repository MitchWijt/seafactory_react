import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

import Button from '../button'

const StripeCheckout = ({ location }) => {
  // Get the lookup key for the price from the previous page redirect.
  const [clientSecret] = useState(localStorage.stripePaymentSecret)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, _setMessages] = useState('')
  const [paymentIntent, setPaymentIntent] = useState()

  // helper for displaying status messages.
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`)
  }

  // Initialize an instance of stripe.
  const stripe = useStripe()
  const elements = useElements()

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return ''
  }

  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email } = JSON.parse(localStorage.newUser || '{}')

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use card Element to tokenize payment details
    setIsLoading(true)
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { email }
      }
    })

    setIsLoading(false)
    if (error) {
      // show error and collect new card details.
      setMessage(error.message)
      return
    }
    setPaymentIntent(paymentIntent)
  }

  if (paymentIntent && paymentIntent.status === 'succeeded') {
    localStorage.clear()
    return <div>Payment Succeeded</div>
  }

  return (
    <>

      <hr />

      <form onSubmit={handleSubmit}>
        <CardElement />

        <Button
          category='cta'
          fontType='bold'
          text='Continue'
          isLoading={isLoading}
          style={{ marginTop: 30 }}
        />

        <div>{messages}</div>
      </form>
    </>
  )
}

export default withRouter(StripeCheckout)