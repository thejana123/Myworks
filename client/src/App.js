
import { Grid } from '@material-ui/core';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import Footer from './components/footer';
import Logout from './components/logout';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import {  useEffect } from 'react';

const useStyles = makeStyles({

  content:{
    marginTop:'10px',
    // marginLeft:'auto',
    // marginRight:'auto',
    // display:'flex',
    // flexDirection: "row",
    flexGrow:1,
  },
  Ccards:{
    // marginRight:'auto',
    // marginLeft:'auto',
    
  }
});


function App() {

  const classes=useStyles();
  // const status=localStorage.getItem('loginStatus')==='true';
  const status=useSelector(state=>state.Login);
 


  
  useEffect(()=>{
    
  },[status]);
  return (
    <div>
      <Router>
      <Navbar/>
      <div className={classes.content}>
      <Grid className={classes.Ccards} container spacing={3}>
        
        <Switch>
          <Route exact path="/" component={()=><Home authorized={status}/>}/>
           
          <Route path="/account">
            
          </Route>
          <Route path="/login"  component={()=><Login authorized={status}/>}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/logout' component={()=><Logout authorized={status}/>}/>
        </Switch>

      
      </Grid>
      </div>
        
      <Footer/>
      </Router>
      
    </div>
    //aravinda is the man
  );
}

export default App;
