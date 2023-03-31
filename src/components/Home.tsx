import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { LinearProgress, Box, Stack, Button } from '@mui/material';

import Cookies from 'universal-cookie';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  mainbox1: {
    width: "100%",
    height: 730,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "column",


  },
  box1: {
    height: "95%",
    width: 500,
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "scroll",
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    '@media (max-width: 504px)': {
      width: "100%"
    },
  },

  postsEle: {
    '&:hover': {
      cursor: "pointer",
    },
  },

  box2: {
    height: "50%",
    width: "70%",
    border: "2px solid blue",
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    // marginRight: 25,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    alignItems: "center"


  },
  img1: {
    borderRadius: 200,
    height: 50,
    width: 50,
    border: "2px solid black",
    marginRight: 15
  }




}));






const Home = () => {

  //main userData interface
  interface userObject {
    gender: String,
    name: { first: string, last: string, title: string },
    id: { name: string },
    picture: { large: string }
  }




  const classes = useStyles();
  const navigate = useNavigate();

  //Initializing cokkies to store login
  const cookies = new Cookies();

  //Variable to store how many contacts to display
  const [displayIndex, setDisplayIndex] = useState(20);

  //Variable to store userData
  let [userData, setUserData] = useState<userObject[]>([]);

  //Variable to determine loading
  const [dataLoading, setDataLoading] = useState(false);

  // Fetching data from the api
  const handleData = async () => {
    setDataLoading(true);
    const { data } = await axios.get('https://randomuser.me/api/?results=1000');
    setUserData(data.results);
    setDataLoading(false);
    userData = data.results;

    //Storing in localstorage my initial set of data
    localStorage.setItem("myData", JSON.stringify(data.results));
  }

  //UseEffect to check whether data fetching is needed
  useEffect(() => {
    let var1 = localStorage.getItem("myData");
    if (var1 === null) {
      handleData();
    } else {
      setUserData(JSON.parse(var1));
    }

  }, []);

  //UseEffect to check whether user is logged in
  //It redirects to Login page if not logged in
  useEffect(() => {
    let val1 = cookies.get("isLogin");
    if (val1 === "false" || val1 === undefined) {
      navigate('/');
    }
  }, [])




  const handleLogout = () => {
    //Set user as not loggedIn
    cookies.set("isLogin", false);
    navigate('/');
  }

  //Function which loads for 2 sec
  const waitForFinish1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo")


    }, 2000);
  });

  //handle event at the end of scroll
  const handleScroll = async (e: any) => {
    
    //Checks whether user approached the end of scroll

    //For Chrome checkup
    if (Math.ceil(e.target.scrollTop + e.target.clientHeight) - e.target.scrollHeight<=2 && Math.ceil(e.target.scrollTop + e.target.clientHeight) - e.target.scrollHeight>=0) {
      let valTop1 = e.target.scrollTop;
      //Sends a request to wait for 2 sec
      await waitForFinish1


      //Increase display element by 20
      setDisplayIndex(displayIndex + 20);
      //Scrolls to the last element of previous data
      e.target.scrollTop = valTop1;
    }

    //For Firefox checkup
    else if (e.target.scrollTop === e.target.scrollTopMax) {
      let valTop1 = e.target.scrollTop;
      //Sends a request to wait for 2 sec
      await waitForFinish1


      //Increase display element by 20
      setDisplayIndex(displayIndex + 20);
      //Scrolls to the last element of previous data
      e.target.scrollTop = valTop1;



    }
  }






  return (

    <>


      <div className={classes.mainbox1}>
        <div style={{ height: 44, width: "90%", display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <Stack style={{ height: 44, width: 100 }} spacing={2} direction="row">

            <Button variant="contained" onClick={handleLogout}><h4>LOGOUT</h4></Button>

          </Stack>
        </div>

        <div className={classes.box1} onScroll={handleScroll} >
          {
            (dataLoading) ? (
              <>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                  </Box>
                </div>

              </>
            ) : (


              userData.slice(0, displayIndex + 1).map((item, index) => {

                return (
                  <div key={index} className={classes.box2} id={item.id.name} >
                    <img className={classes.img1} src={item.picture.large} alt="" />
                    <h4>{item.name.first + " " + item.name.last} </h4>
                  </div>
                )

              })


            )
          }
          <div style={{ height: 200, width: "100%", }}>
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </div>
        </div>
      </div>



    </>
  )
}

export default Home