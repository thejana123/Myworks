import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles, TextField } from '@material-ui/core';
import {Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { addItem } from '../actions';


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
const Add=()=>{

    const classes=useStyles();
    const list=useSelector(state=>state.Add);
    const [todo,setTodo] = useState('');
    const [msg,setMsg]=useState('');
    const dispatch=useDispatch();
    console.log(list);
    const loginStatus=localStorage.getItem('loginStatus')==='true';
    const user=loginStatus ? localStorage.getItem('user'):'';



    const addItems=(e)=>{
      
      if(todo===''){
        setMsg('Please enter an item');
      }else{
        setMsg('');
        axios.post('/add',{
          User:user,
          Todo:todo,
          Flag:'todo'
        }).then(res=>{
          
          dispatch(addItem(todo));
          setTodo('');
        })
        

      }
      
    }


    return(
        <div className={classes.Cards}>
        <Typography className={classes.msg}>{msg}</Typography>
        <TextField
        className={classes.txt}
          id="outlined-username"
          label="ToDo"
          name={todo}
          variant="outlined"
          required={true}
          onBlur={(e)=>setTodo(e.target.value)}
        />
        
          <Button className={classes.btn} onClick={addItems}>+</Button>
          <Link to="/">
          <Button className={classes.btn}> Show completed</Button>
          </Link>
    
        </div>
    );
}

export default Add;