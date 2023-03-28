import React from 'react';
import {useState, useEffect } from 'react';
import {List,
    ListItem,
    ListItemText,
    makeStyles,
    Button,
    Typography
} from '@material-ui/core';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import {useSelector,useDispatch } from 'react-redux';
import {addItem} from './../actions';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      overflowY:'auto',
      backgroundColor: theme.palette.background.paper,
      height:300
    },
  }));

const Todo=()=>{

    const classes=useStyles;
    const updater=useSelector(state=>state.Add);
    const dispatch=useDispatch();
    const [list,setList]=useState([]);



    const deleteItem=(item)=>{
      let user=localStorage.getItem('user');
      try {
        axios.post('/deleteItem',{
          user:user,
          item:item
        }).then(()=>{
         dispatch(addItem(user));
        })
      } catch (error) {
        console.log(error);
      }
     }


  useEffect(()=>{
    let user=localStorage.getItem('user');
    let newAr=[];
    try {
      
      axios.post('/doneItems',{
      
        user:user,
        flag:"done" 
      })
      .then((response) => {
        newAr=response.data.map(titem=>([titem.item]))
        setList(newAr);
       
    }
    
    )
    } catch (error) {
      console.log(error);
    }
  },[updater])
 



  return(
    <List className={classes.root}>
      <Typography></Typography>
  {list.map((value) => {
    const labelId = `checkbox-list-label-${value}`;

    return (
      <ListItem key={value} role={undefined} dense >
        {/* <ListItemIcon>
          <Checkbox
            button onClick={handleToggle(value)}
            edge="start"
            checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
           
        </ListItemIcon> */}
        <ListItemText id={labelId} primary={value} />
        <Button>
        <DeleteIcon name={value} button onClick={()=>{deleteItem(value)}}/>
        </Button>
        {/* <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments">
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>
      
    );
  })}
</List>
);
}

export default Todo;