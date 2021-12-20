import {useHistory} from 'react-router-dom';
import {LoginButton} from '../components/parts/AuthButtons';
import CirculerLoading from '../components/CirculerLoading';
import {Card,CardContent,CardMedia,CardActions} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

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
      justifyContent:"center",
      // marginRight:"auto",
      // marginLeft:"auto"
      margin:"0 auto"
   }

}));

const SingleButtonPage = ({Content,ButtonAction,Footer}) => {
   const history=useHistory();
   const classes=styles();
   
   return (

      <div className={classes.loginroot}>
         <Card className={classes.card}>
            <CardContent>
               {Content}
            </CardContent>
            <CardActions>        
               <div className={classes.button}>{ButtonAction}</div>
            </CardActions>
         </Card>
         <div>{Footer}</div>
          
      </div>
   );
};

export default SingleButtonPage;