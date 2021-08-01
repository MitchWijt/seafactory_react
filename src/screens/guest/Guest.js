import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setGuest } from '../../redux/actions/guestActions'
import { setIsLoading } from '../../redux/actions/loadingActions'
import LoadingScreen from '../../components/loadingScreen'
import ActiveGuest from './ActiveGuest'
import CheckedOutGuest from './CheckedOutGuest'
import { getGuestData } from "../../services/api"

const Guest = (props) => {
  const {
    guest,
    isLoading,
    setGuest,
    setIsLoading
  } = props
  const guestId = props.match.params.id

  useEffect(() => {
    const getGuest = async () => {
      const guestData = getGuestData(guestId)
      setGuest(guestData.data)
      setIsLoading(false)
    }

    getGuest()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isLoading ? <LoadingScreen /> : guest.registration.checked_out_by ? <CheckedOutGuest {...props} /> : <ActiveGuest {...props} />}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    guest: state.guestReducer.guest,
    isLoading: state.loadingReducer.isLoading
  }
}

const mapDispatchToProps = { setGuest, setIsLoading }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guest)
