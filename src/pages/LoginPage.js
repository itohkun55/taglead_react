import {useHistory} from 'react-router-dom';
import {FirstLoginButton, LoginButton} from '../components/parts/AuthButtons';
import CirculerLoading from '../components/CirculerLoading';
import {CardMedia} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SingleButtonPage from './SingleButtonPage';

const styles=makeStyles((theme)=>({
   buttons:{
      display:"block",
      //margin:"0 auto",
      marginRight:"auto",
      marginLeft:"auto",
      alignItems:"center",

      justifyContent:"center"
   }

}));

const LoginPage = () => {
   const classes=styles();
   const CardContent=(
      <CardMedia  height={"50%"} component="img" image={`${process.env.PUBLIC_URL}/tagleadlogo.png`} />
   );

   const CardAction=(
      <div className={classes.buttons}>
            <LoginButton />
            <FirstLoginButton/>
      </div>
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