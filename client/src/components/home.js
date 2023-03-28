import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useState,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import Todo from './dolist';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Done from './donelist';
import Add from './add';
import { useHistory,Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions';


const useStyles = makeStyles({
  root: {
    // flexGrow:1,
    marginTop:40,
    backgroundColor:'#b2dfdb',
    height:500
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
    color:'black',
    textAlign:'center',

  },
  pos: {
    marginBottom: 12,
  },
  Cards:{
    flexGrow:1,
    display:'flex',
    flexDirection: "row",
    flexWrap:'wrap',
  },
  list:{
    overflowY:'auto',
    height:300
  },
  btn:{
    backgroundColor:'#26c6da',
    margin:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:8,
    paddingBottom:8
},
  
});

export default function OutlinedCard(state) {

  const classes=useStyles();
  const updater=useSelector(state=>state.Add);


  useState(()=>{

  },[updater])


if(state.authorized===false){
  return <Redirect to='login'/>
}

  return (
    <Router>
    <div className={classes.Cards}>
      <Grid item xs={1} sm={1}></Grid>
    <Grid  item xs={10} sm={4}>
          <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          To Do
        </Typography>
       <div className={classes.list}>
       <Todo/>
       </div>
      </CardContent>
      <CardActions>
        
        <Link to="/add">
        <Button className={classes.btn}>Add Item</Button>
        </Link>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={1}></Grid>
  
        <Grid item xs={1}></Grid>
       
        <Grid item  xs={10} sm={4}>
          <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Done
        </Typography>
        <div>
        <Switch>
        <Route exact path="/" component={Done}/>
        <Route path="/add" component={Add}/> 
        </Switch>
        </div>
      </CardContent>
    </Card>
        </Grid>
        <Grid item xs={1} sm={1}></Grid>
        </div> 
        </Router>
    
   
  );
}


