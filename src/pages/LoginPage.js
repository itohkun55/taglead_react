import {useHistory} from 'react-router-dom';
import {LoginButton} from '../components/parts/AuthButtons';
import CirculerLoading from '../components/CirculerLoading';
import {Card,CardContent,CardMedia,CardActions,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SingleButtonPage from './SingleButtonPage';
import {axios} from "axios";

const styles=makeStyles((theme)=>({
   loginroot:{

      justifyContent:"center",
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto` 
   },

   card: {
      //:"50%",
      justifyContent:"center",
      marginTop: theme.spacing(20),
      width:'70%',
      maxWidth:"300px"

   },
   
   button:{
      display:"block",
      marginRight:"auto",
      marginLeft:"auto"
   }

}));

const LoginPage = () => {
   const history=useHistory();
   const classes=styles();
   const CardContent=(
      <CardMedia  height={"50%"} component="img" image={`${process.env.PUBLIC_URL}/tagleadlogo.png`} />
   );

   const CardAction=(
      <LoginButton  redi={false}　callback={()=>history.push("/")}/>
   );
    const Footer=(
      <CirculerLoading isModal={true} />
    )


    const onClick=()=>{
      axios.get('http://itohkun55.pythonanywhere.com/api/ok')
      .then(results=>{
          console.log(results);
      }).catch(error=>{
          console.log(error.request);
          console.log(error.config);
          
          console.log(error.name);
          console.log(error.message);
          
      });
  }

   return (

      <div>
         <SingleButtonPage 
            Content={CardContent}
            ButtonAction={CardAction}
            Footer={Footer}
         />
         <div>
            <Button onClick={onClick}> 押してみそ </Button>
         </div>
      </div>

   );
};

export default LoginPage;