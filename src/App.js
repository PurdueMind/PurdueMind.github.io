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
      <Navbar />

      <main>
        <Switch>
          <Route exact path={['/', '/PurdueMIND/']}>
            <HomePage />
          </Route>
          <Route path='/People'>
            <PeoplePage />
          </Route>
          <Route exact path='/Projects'>
            <ProjectsPage />
          </Route>
          <Route path='/Projects/:slug'>
            <ProjectDetailPage />
          </Route>
          <Route path='/Learning'>
            <LearningPage />
          </Route>
          <Route path='/Contact'>
            <ContactPage />
          </Route>
        </Switch>
      </main>

      <Footer />
    </div>
    </Router>
  );
};
