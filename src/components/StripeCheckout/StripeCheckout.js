import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { withRouter } from 'react-router-dom'

import Button from '../button/Button'

const StripeCheckout = ({ history }) => {
  // Get the lookup key for the price from the previous page redirect.
  const [clientSecret] = useState(localStorage.stripePaymentSecret)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState('')
  const [paymentIntent, setPaymentIntent] = useState()

  // Initialize an instance of stripe.
  const stripe = useStripe()
  const elements = useElements()

  // Stripe.js has not loaded yet. Make sure to disable
  // form submission until Stripe.js has loaded.
  if (!stripe || !elements) return ''
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
    // show error and collect new card details.
    if (error) return setMessages(error.message)

    setPaymentIntent(paymentIntent)
  }

  if (paymentIntent && paymentIntent.status === 'succeeded') {
    localStorage.clear()
    setTimeout(() => {
      history.push('/login')
    }, 6000)
    return <PaymentSucceeded />
  }

  return (
    <>
      <hr />
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }} />
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

const PaymentSucceeded = () => {
  return (
    <div style={{ color: 'green', fontWeight: 'bold' }}>
      Payment Succeeded, Thanks for doing business with us. You will be redirected soon
    </div>
  )
}

export default withRouter(StripeCheckout)
