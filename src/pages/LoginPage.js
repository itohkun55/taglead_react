import {useHistory} from 'react-router-dom';
import {LoginButton} from '../components/parts/AuthButtons';
import CirculerLoading from '../components/CirculerLoading';
import {CardMedia} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SingleButtonPage from './SingleButtonPage';

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

   return (

      <div>
         <SingleButtonPage 
            Content={CardContent}
            ButtonAction={CardAction}
            Footer={Footer}
         />
      </div>

   );
};

export default LoginPage;