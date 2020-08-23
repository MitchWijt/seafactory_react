import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import HomeInput from '../../components/homeInput'
import exampleImglarge from '../../lib/img/example-pic-large.jpeg'
import projectHiu from '../../lib/img/project_hiu.png'
import Hr from '../../components/hr'
import {Link} from 'react-router-dom'
import './style.css'

const Home = (props) => {
    return (
        <>
            <Header/>
            <div>
                <div className='homepage-banner'>
                    <div className='img-overlay'>
                        <div className='mainTitle-banner'>
                            <p style={{fontSize: '60px', marginBottom: '40px'}}>Register divers, <br></br> rentals, and more!</p>
                            <p style={{fontSize: '50px', marginBottom: '40px'}}>Your one stop dive center administrator</p>
                            <p style={{fontSize: '30px', marginBottom: '80px'}}>You hate paperwork? So do we!</p>
                            <HomeInput/>
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
                            <img className='our-story-card-img' src={exampleImglarge} alt=''/>
                        </div>
                    </div>
                </div>
                <Hr/>
                <div className='container'>
                    <div className='our-story-card flipped'>
                        <div className='our-story-card-img-container'>
                            <img className='our-story-card-img' src={exampleImglarge} alt=''/>
                        </div>
                        <div className='our-story-card-text'>
                            <h1 className='our-story-card-title'>Simple check-in form</h1>
                            <h2 className='our-story-card-subtitle'>Check-in your guests through a Personalized check-in url</h2>
                        </div>
                    </div>
                </div>
                <Hr/>
                <div className='container'>
                    <div className='our-story-card'>
                        <div className='our-story-card-text'>
                            <h1 className='our-story-card-title'>Easy to use</h1>
                            <h2 className='our-story-card-subtitle'>Easy to manipulate, see, and add data into the system</h2>
                        </div>
                        <div className='our-story-card-img-container'>
                            <img className='our-story-card-img' src={exampleImglarge} alt=''/>
                        </div>
                    </div>
                </div>
                <Hr/>
                <div className='container'>
                    <div className='our-story-card marine-species-card'>
                        <div className='our-story-card-text'>
                            <h1 className='our-story-card-title'>You save marine species at the same time!</h1>
                            <div className='our-story-card-img-container'>
                                <img className='our-story-card-img' src={projectHiu} alt=''/>
                            </div>
                            <div className='our-story-card-text non-profit-info'>
                                <p className='our-story-card-subtitle'>By choosing to use our services for your dive center. <br></br> You are also saving sharks and different marine species at the same time!</p>
                                <p className='our-story-card-subtitle bold'>How?</p>
                                <p className='our-story-card-subtitle'>With every dive center that chooses to use our services we donate <span className='bold'>$3/Month</span> to a Non-profit organization called <span className='bold'>Project Hiu</span></p>
                                <Link className='our-story-card-subtitle underline' to='/'>Learn more</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Hr/> 
                <div className='container'>
                    <div className='our-story-card our-customers-card'>
                        <div className='our-story-card-text'>
                            <h1 className='our-story-card-title'>Our customers</h1>
                             <div className='our-story-card-img-container'>
                                <img className='our-story-card-img' src='https://seafactory-cdn.s3.amazonaws.com/companyLogos/5e9b838334e1d87bb7999acb/wannadive-logo.png' alt='Wannadive bonaire'/>
                            </div>
                            <p className='our-story-card-subtitle bold'>Wannadive Bonaire</p>
                        </div>
                    </div>
                </div> 
                <Hr/>   
                <div className='container'>
                    <div className='our-story-card about-us-card'>
                        <div className='our-story-card-text'>
                            <h1 className='our-story-card-title'>About us</h1>
                            <p className='our-story-card-subtitle'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus aspernatur, esse incidunt facilis nam maiores doloribus dolorem ad accusamus, tempore quo libero magnam delectus commodi qui. Quisquam molestiae delectus porro.</p>
                            <HomeInput/>
                        </div>
                    </div>
                </div> 
                <Hr/>
            </div>
            <Footer/>
        </>
    )
}

export default Home