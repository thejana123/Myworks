import React from 'react';
import {useState, useEffect } from 'react';
import {List,
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
    Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import {addItem} from './../actions';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      overflowY:'auto',
      backgroundColor: theme.palette.background.paper,
      height:250
    },
  }));

const Todo=()=>{

    const classes=useStyles;
    const [list,setList]=useState([]);
    const dispatch=useDispatch();
    const updater=useSelector(state=>state.Add);
    
    
    
   const updateList=(item)=>{
     let user=localStorage.getItem('user');
     try {
       axios.post('/updateDone',{
         user:user,
        flag:'done',
        item:item
       }).then((res)=>{
        dispatch(addItem(user));
       })
     } catch (error) {
       console.log(error);
     }
   }


   const deleteItem=(item)=>{
    let user=localStorage.getItem('user');
    try {
      axios.post('/deleteItem',{
        user:user,
        item:item
      }).then((res)=>{
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
       
       axios.post('/items',{
       
         user:user,
         flag:"todo" 
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
  

 if(list.length===0){
   return(
     <div>Nothing to do..</div>
   )
 }

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
             <CheckIcon name={value} button onClick={()=>{updateList(value)}}
            />  
            </Button>
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