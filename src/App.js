import './App.css';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import HomePage from './pages/home/HomePage'
import AboutPage from './pages/about/AboutPage'
import ProjectsPage from './pages/projects/ProjectsPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function RedirectHandler() {
  const history = useHistory();
  
  useEffect(() => {
    const search = window.location.search;
    if (search.startsWith('?/')) {
      // Extract the path from ?/path
      const cleanPath = search.slice(2);
      // Navigate to the clean path
      history.replace(cleanPath || '/');
    }
  }, [history]);
  
  return null;
}

export default function App() {
  return (
    <Router>
    <RedirectHandler />
    <div className='App'>
      <link rel='preconnect' href='https://fonts.googleapis.com'/>
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true"/>
      <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel="stylesheet" />
        
      <Navbar />

      <Switch>
          <Route exact path='/'>
            <HomePage />
            <Footer/>
          </Route>
          <Route exact path='/PurdueMIND/'>
            <HomePage/>
            <Footer/>
          </Route>
          <Route path='/AboutUs'>
            <AboutPage/>
            <Footer/>
          </Route>
          <Route path='/Projects'>
            <ProjectsPage/>
            <Footer/>
          </Route>
          <Route path='/Onboarding'>
            <OnboardingPage/>
            <Footer/>
          </Route>
      </Switch>
      
      </div>
    </Router>
  );
};
