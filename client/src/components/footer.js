import React from 'react';
import {makeStyles} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles=makeStyles({

    footer:{
        marginTop: 1,
        padding: 1,
        backgroundColor: '#00897b',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height:50,
        alignContent:'center',
        textAlign:'center'
    },
    link:{
        marginRight:'10px',
        marginLeft:'10px',
        color:'black'
    }
})

const Footer=()=>{
    const classes=useStyles();

    return(
        <div className={classes.footer}>
            <div><p>
            <a className={classes.link} href="https://github.com/nermoo"><GitHubIcon/></a>
            <a className={classes.link} href="https://www.facebook.com/aravinda.navarathna"><FacebookIcon/></a>
            <a className={classes.link} href="linkedin.com/in/aravinda-nawarathna-a6765a196"><LinkedInIcon/></a>
            </p></div>

        </div>
    );
}

export default Footer;