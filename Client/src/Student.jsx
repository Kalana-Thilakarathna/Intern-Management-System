import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Student.css'
import Header from './Common/Header'
import Footer from './Common/Footer'


function Student() {

  const navigate = useNavigate()

  function HandleLogout(){
    
    navigate('/')
  }
  return (
    <>
    <Header/>

    <main className='student-body'>
      <nav className='student-nav'>
        <button >Home</button>
        <button >Students</button>
        <button>Companies</button>
        <button>Cordinators</button>
      </nav>
      <section className='info-section'>
        <div className='section-container'>
          <div className='container-summery'>
            <div className='container-summery-header'>
              <h1>Summery</h1>
            </div>
            <div className='container-summery-body'></div>
          </div>
          <div className='container-admin-info'></div>

        </div>
      </section>
    </main>
    

    <Footer/>
    </>
    
  )
}

export default Student
