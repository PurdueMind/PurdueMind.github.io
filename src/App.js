import './App.css';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import HomePage from './pages/home/HomePage'
import PeoplePage from './pages/people/PeoplePage'
import ProjectsPage from './pages/projects/ProjectsPage'
import ProjectDetailPage from './pages/projects/ProjectDetailPage'
import LearningPage from './pages/learning/LearningPage'
import ContactPage from './pages/contact/ContactPage'

import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
    <RedirectHandler />
    <ScrollToTop />
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
          <Route path='/People'>
            <PeoplePage/>
            <Footer/>
          </Route>
          <Route exact path='/Projects'>
            <ProjectsPage/>
            <Footer/>
          </Route>
          <Route path='/Projects/:slug'>
            <ProjectDetailPage/>
            <Footer/>
          </Route>
          <Route path='/Learning'>
            <LearningPage/>
            <Footer/>
          </Route>
          <Route path='/Contact'>
            <ContactPage/>
            <Footer/>
          </Route>
      </Switch>
      
      </div>
    </Router>
  );
};
