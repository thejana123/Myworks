import React from "react";
import { CardActions, Button, Grid, Card, makeStyles } from '@material-ui/core';
import { useHistory,Redirect } from "react-router-dom";
import {addItem} from './../actions';
import {useDispatch } from 'react-redux';
import {login } from './../actions';


const useStyles = makeStyles({
    root: {
        // flexGrow:1,
        marginTop:60,
        backgroundColor:'#b2dfdb',
        textAlign:'center',
        marginBottom:'auto'

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
        marginTop:12,
        marginBottom:20
    
      },
      pos: {
        marginBottom: 12,
      },
      Cards:{
        flexGrow:1,
        display:'flex',
        flexDirection: "row",
        flexWrap:'wrap',
        alignContent:'center'
      },
      loginbtn:{
          alignItems:'center',
          justifyContent:'center',

      },
      btn:{
          backgroundColor:'#26c6da',
          margin:10,
          paddingLeft:10,
          paddingRight:10,
          paddingTop:8,
          paddingBottom:8
      },
      txt:{
        width:'60%'
      },
      signup:{
        marginTop:20,
        marginBottom:20
      },
      msg:{
        color:'red'
      }
      
});

const Logout=(state)=>{


    const history=useHistory();
    const classes=useStyles();
    const dispatch=useDispatch();


    if(state.authorized===false){
        return <Redirect to='login'/>
    }
    const logout=()=>{
        localStorage.clear();
        localStorage.setItem('loginStatus',false);
        dispatch(addItem('user3'));
        dispatch(login('logout'));
        history.push('/login');

    }

    
    return (
        <div className={classes.Cards}>
      <Grid item xs={1} sm={2}></Grid>
    <Grid  item xs={10} sm={8}>
          <Card className={classes.root} variant="outlined">
      
      <CardActions className={classes.loginbtn}>
          <Button className={classes.btn} onClick={logout}>LogOut</Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={1} sm={2}></Grid>
        </div>
    )
}


export default Logout;