import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import HomeInput from '../../components/home/homeInput/HomeInput'
import HomeInputButton from '../../components/home/homeInputButton/HomeInputButton'
import exampleImglarge from '../../lib/img/example-pic-large.jpeg'
import projectHiu from '../../lib/img/project_hiu.png'
import Hr from '../../components/hr/Hr'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addEmail } from '../../redux/actions/newAccountActions'
import { Formik } from 'formik'
import fetchCdnImage from '../../services/cdnImage'
import * as Yup from 'yup'
import './style.css'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

const Home = (props) => {
  useEffect(() => {
    if (props.userState.isLoggedIn) {
      window.location.href = '/dashboard'
    }
  }, [props.userState])

  const HomeEmailInput = () => (
    <div>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          const email = values.email
          props.addEmail(email)
          localStorage.setItem('newUser', JSON.stringify({ email: email }))
          setSubmitting(false)
          props.history.push('/register')
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='home-input-group'>
              <HomeInput type='email' name='email' onChange={handleChange} value={values.email} />
              <HomeInputButton type='submit' title='Try it now' disabled={isSubmitting} />
            </div>
            <span className='input-error'>{errors.email}</span>
          </form>
        )}
      </Formik>
    </div>
  )

  return (
    <>
      <Header />
      <div>
        <div className='homepage-banner'>
          <div className='img-overlay'>
            <div className='mainTitle-banner'>
              <p style={{ fontSize: '60px', marginBottom: '40px' }}>Register divers, <br /> rentals, and more!</p>
              <p style={{ fontSize: '50px', marginBottom: '40px' }}>Your one stop dive center administrator</p>
              <p style={{ fontSize: '30px', marginBottom: '80px' }}>You hate paperwork? So do we!</p>
              <HomeEmailInput />
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='our-story-card'>
            <div className='our-story-card-text'>
              <h1 className='our-story-card-title'>Daily personalized dashboard</h1>
              <h2 className='our-story-card-subtitle'>Get a daily personalized dashboard Which tells you what to do to today, The weather and more!</h2>
            </div>
            <div className='our-story-card-img-container'>
              <img className='our-story-card-img' src={exampleImglarge} alt='' />
            </div>
          </div>
        </div>
        <Hr />
        <div className='container'>
          <div className='our-story-card flipped'>
            <div className='our-story-card-img-container'>
              <img className='our-story-card-img' src={exampleImglarge} alt='' />
            </div>
            <div className='our-story-card-text'>
              <h1 className='our-story-card-title'>Simple check-in form</h1>
              <h2 className='our-story-card-subtitle'>Check-in your guests through a Personalized check-in url</h2>
            </div>
          </div>
        </div>
        <Hr />
        <div className='container'>
          <div className='our-story-card'>
            <div className='our-story-card-text'>
              <h1 className='our-story-card-title'>Easy to use</h1>
              <h2 className='our-story-card-subtitle'>Easy to manipulate, see, and add data into the system</h2>
            </div>
            <div className='our-story-card-img-container'>
              <img className='our-story-card-img' src={exampleImglarge} alt='' />
            </div>
          </div>
        </div>
        <Hr />
        <div className='container'>
          <div className='our-story-card marine-species-card'>
            <div className='our-story-card-text'>
              <h1 className='our-story-card-title'>Your membership helps us save sea life</h1>
              <div className='our-story-card-img-container'>
                <img className='our-story-card-img' src={projectHiu} alt='' />
              </div>
              <div className='our-story-card-text non-profit-info'>
                <p className='our-story-card-subtitle'>By choosing to use our services for your dive center <br /> You are also saving sharks and different marine species at the same time!</p>
                <p className='our-story-card-subtitle bold'>How?</p>
                <p className='our-story-card-subtitle'>With every dive center that chooses to use our services we donate <span className='bold'>$3/Month</span> to a Non-profit organization called <span className='bold'>Project Hiu</span></p>
                <Link className='our-story-card-subtitle underline' to='/'>Learn more</Link>
              </div>
            </div>
          </div>
        </div>
        <Hr />
        <div className='container'>
          <div className='our-story-card our-customers-card'>
            <div className='our-story-card-text'>
              <h1 className='our-story-card-title'>Our customers</h1>
              <div className='our-story-card-img-container'>
                <img className='our-story-card-img' src={fetchCdnImage('/companyLogos/5e9b838334e1d87bb7999acb/wannadive-logo.png')} alt='Wannadive bonaire' />
              </div>
              <p className='our-story-card-subtitle bold'>Wannadive Bonaire</p>
            </div>
          </div>
        </div>
        <Hr />
        <div className='container'>
          <div className='our-story-card about-us-card'>
            <div className='our-story-card-text'>
              <h1 className='our-story-card-title'>About us</h1>
              <p className='our-story-card-subtitle'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus aspernatur, esse incidunt facilis nam maiores doloribus dolorem ad accusamus, tempore quo libero magnam delectus commodi qui. Quisquam molestiae delectus porro.</p>
              <HomeEmailInput />
            </div>
          </div>
        </div>
        <Hr />
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    newAccount: { ...state.newAccountReducer },
    userState: { ...state.userStateReducer }
  }
}

const mapDispatchToProps = { addEmail }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
