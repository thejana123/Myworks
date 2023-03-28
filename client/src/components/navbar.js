import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {addItem} from './../actions';
import { user } from './../actions/index';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  inputRoot: {
    color: '#b2dfdb',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  title:{
    textDecoration:'none',
    color:'white'
  },
  nav:{
    backgroundColor:'#009688',
  },
  user:{
    color:'black'
  },
  logo:{
    marginLeft:'5px'
  }
}));

 const Navbar=()=> {
   
  const classes = useStyles();
  const dispatch=useDispatch();
  const updater=useSelector(state=>state.Add);
  const log=useSelector(state=>state.Login);
  console.log(log);
  const [showName,setName]=useState("login/signup");

  const home=()=>{
    dispatch(addItem('user'));
  }
 
  useEffect(()=>{

    let user=localStorage.getItem('user');
    if(log===false){
      setName("login/signup")
      console.log('no user');
    }else{
      setName(user);
    }
  },[log])

 

  
  


  return (
    
      <AppBar className={classes.nav} position="static">
        <Toolbar>
          <Link to="/">
          <Typography className={classes.title} variant="h6" noWrap>
            <Button onClick={home}>
            To Do
            <BorderColorIcon className={classes.logo}/>
            </Button>
          </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to='/login'>
              
            <IconButton
              className={classes.user}
              edge="end"
              aria-label="account of current user"
            //   aria-controls={menuId}
              aria-haspopup="true"
              // onClick={ handleUserIcon}
              color="inherit"
              
            >
              <Typography>{showName}  &nbsp;</Typography>
              <AccountCircle/>
            </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
  );
}


export default Navbar;