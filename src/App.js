import './App.css';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import HomePage from './pages/home/HomePage'
import AboutPage from './pages/about/AboutPage'
import ProjectsPage from './pages/projects/ProjectsPage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
    <div className='App'>
      <link rel='preconnect' href='https://fonts.googleapis.com'/>
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin/>
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
      </Switch>
      
      </div>
    </Router>
  );
};
