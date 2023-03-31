import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    '@media (min-width: 780px)': {
        width: '80%'
    },

    mainbox1: {
        width: "100%",
        minHeight: 700,
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(60deg,#ff3a7c,#741eff)",

    },
    box1: {
        minHeight: 555,
        height: "fit-content",
        width: "70%",
        border: "2px solid black",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        flexWrap: "wrap",
        justifyContent: "center"
    },

    postsEle: {
        '&:hover': {
            cursor: "pointer",
        },
    },
    childBox1: {
        width: 525,
        height: 555,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",

    },
    childBox2: {
        width: 525,
        height: 555,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",


    },
    input1: {
        height: "10%",
        width: "67%",
        backgroundColor: "#d7d7d7;",
        borderRadius: 30,
        border: "2px solid black"
    },
    btn1: {
        height: "10%",
        width: "73%",
        backgroundColor: "#d7d7d7;",
        borderRadius: 30,
        border: "2px solid black",

        '&:hover': {
            cursor: "pointer",
        },

    }




}));






const LoginForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    //Initializing cookies to store login
    const cookies = new Cookies();

    //store whether user is loggedin
    const handleLogin = () => {
        cookies.set("isLogin", true);
        //navigate to home
        navigate('/home');
    }


    return (
        <>
            <div className={classes.mainbox1}>
                <div className={classes.box1}>
                    <div className={classes.childBox1}>
                        <img src="https://cdn.wallpapersafari.com/62/4/YB295D.jpg" style={{ height: "40%", width: "40%" }} alt="" />
                        <h4>Demo logo</h4>
                    </div>
                    <div className={classes.childBox2}>
                        <input className={classes.input1} type="text" name="" placeholder='Email' style={{ marginBottom: 10, fontSize: 20, paddingLeft: 20 }} />
                        <input className={classes.input1} type="text" name="" placeholder='Password' style={{ marginBottom: 45, fontSize: 20, paddingLeft: 20 }} />
                        <button className={classes.btn1} style={{ backgroundColor: "#1aff1a", fontSize: 20 }} onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginForm