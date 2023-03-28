import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid , Card, CardContent,CardActions, Button, makeStyles, TextField } from '@material-ui/core';
import {Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        // flexGrow:1,
        marginTop:30,
        backgroundColor:'#b2dfdb',
        textAlign:'center',
        marginBottom:30

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
      login:{
        marginTop:20,
        marginBottom:20
      },
      msg:{
        color:'red'
      }
      
});
const Signup=()=>{

    const classes=useStyles();

    // const [info,setInfo]=useState({
    //     email:'',
    //     username:'',
    //     password1:'',
    //     password2:''
    // });
    const history=useHistory();
    const [email,setMail]=useState('');
    const [username,setname]=useState('');
    const [password,setPass]=useState('');
    const [passoword2,setPass2]=useState('');
    const [msg,setMsg]=useState('');
    const [showPass,setShow]=useState(false);
    const [regStatus,setreg]=useState(false);

    // const changeHandler=(e)=>{

    //     console.log(e.target.value);
    //     var nam=e.target.name;
    //     var val=e.target.value;
    //     setInfo({[nam]:val});
    //     console.log(info);
        

    // }
    // useEffect(()=>{
    //     console.log("hi");
    //     setMail('');
    // },[regStatus])

    const submit=()=>{
        if(email==='' || username==='' || password===''){
            setMsg("Please fill all the fields");
            
        }else{
            if(password !== passoword2){
                setMsg("passwords are not matching");
            }else{
                setMsg('');
                setreg(true);
                console.log("done");
                console.log(email,username,password);
                axios.post('http://localhost:3000/userData',{
                  Name:username,
                  Email:email,
                  Password:password
                }).then(res=>{
                  console.log(res.statusText);
                  history.push('login');
                })
                


            }

        }
    }

    const handleClickShowPassword = () => {
      setShow( showPass=== !showPass );
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return(
        <div className={classes.Cards}>
      <Grid item xs={1} sm={2}></Grid>
    <Grid  item xs={10} sm={8}>
          <Card className={classes.root} variant="outlined">
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Register
        </Typography>
        <Typography className={classes.msg}>{msg}</Typography>
      <CardContent>
        
        <TextField
        className={classes.txt}
          id="outlined-email"
          label="Email"
          name={email}
          variant="outlined"
          required={true}
          onBlur={event => setMail(event.target.value)}
        />
        </CardContent>
        <CardContent>
        <TextField
        className={classes.txt}
          id="outlined-username"
          label="Username"
          name={username}
          variant="outlined"
          required={true}
          onChange={event => setname(event.target.value)}
          inputPorps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          
        />
      </CardContent>
      <CardContent>
        <TextField
        className={classes.txt}
          id="outlined-password-input"
          label="Password"
          type="password"
          name={password}
          autoComplete="current-password"
          variant="outlined"
          required={true}
          onChange={event => setPass(event.target.value)}
        />
      </CardContent>
      <CardContent>
        <TextField
        className={classes.txt}
          label="Conform Password"
          type="password"
          name={passoword2}
          variant="outlined"
          required={true}
          onChange={event => setPass2(event.target.value)}
        />
      </CardContent>
      <CardActions className={classes.loginbtn}>
          <Button type='submit' className={classes.btn} onClick={submit}>Register</Button>
      </CardActions>
      <Typography className={classes.login}>
        Already have an account? <Link to='/login'>Login</Link> 
      </Typography>
    </Card>
        </Grid>
        <Grid item xs={1} sm={2}></Grid>
        </div>
    );
}

export default Signup;