import axios from "axios";
import { API_URL } from "../../lib/ServiceConfig";
import { makeStyles, Typography } from "@material-ui/core";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import {CONNECT_ERROR,ERROR_RESET, MEMO_END} from '../../lib/ActionTypeString';


const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const LOGIN_URL=`${API_URL}/auth/convert-token`;

const styles=makeStyles((theme)=>({
    buttons:{
        display:"block",
        //margin:"0 auto",
        marginRight:"auto",
        marginLeft:"auto",
        alignItems:"center",
    
        justifyContent:"center"
    }
    
    })
);

export const LoginButton=({red, callback})=>{
    const dispatch = useDispatch();
    const history=useHistory();
    const LOGIN_URL=`${API_URL}/auth/convert-token`;
    const classes=styles();

    const SetAuthConnection = (response) => {
        axios.post(LOGIN_URL, {
            token: response.accessToken,
            backend: "google-oauth2",
            grant_type: "convert_token",
            client_id: drfClientId,
            client_secret: drfClientSecret,
        })
        .then((res) => {
            const { access_token, refresh_token } = res.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            
            history.push("/main");
        })
        .catch((err) => {
            console.log(err.messages);
            dispatch({type:CONNECT_ERROR});
        });
    };
    


    return(
        <div>
            <GoogleLogin
            clientId={googleClientId}
            buttonText="LOGIN WITH GOOGLE"
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}

            onSuccess={(response) => SetAuthConnection(response)}
            render={(renderProps) => (
            <Button
                className={classes.buttons}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                color='primary'
                type="button"
                class="login-with-google-btn"
            >
                <Typography variant="h6" gutterBottom >
                ログイン
                </Typography>
            </Button>
            )}
            onFailure={(err) => console.log(err.error,err.details)}
            />
        </div>

    )
    
}

//初期登録用ボタン
export const FirstLoginButton=({red, callback})=>{
    const [clicked,setClicked]=useState(false);
    const dispatch = useDispatch();
    const history=useHistory();
    const classes=styles();

    const CreateAuthConnection = (response) => {
        console.log("認証開始")
        axios.post(LOGIN_URL, {
            token: response.accessToken,
            backend: "google-oauth2",
            grant_type: "convert_token",
            client_id: drfClientId,
            client_secret: drfClientSecret,
        })
        .then((res) => {
            console.log("認証成功")
            const { access_token, refresh_token } = res.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            
            history.push("/firstend");
        })
        .catch((err) => {
            console.log("認証失敗",err);
            dispatch({type:CONNECT_ERROR});
        });
    };
    
    return(
        <div >
            <GoogleLogin
            clientId={googleClientId}
            buttonText="LOGIN WITH GOOGLE"
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}

            onSuccess={(response) => CreateAuthConnection(response)}
            render={(renderProps) => (
            <Button
                className={classes.buttons}
                onClick={renderProps.onClick}
            >
                <Typography variant="button" gutterBottom >
                初期登録
                </Typography>
            </Button>
            )}
            onFailure={(err) => console.log(err.error,err.details)}
            />
        </div>

    )
    
}



export const LogOutButton=(props)=>{
    const dispatch = useDispatch();
    const history=useHistory();
    const handleLogOutAction = () => {
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        dispatch({type:ERROR_RESET});
        dispatch({type:MEMO_END})
        history.push("/logout");    
    };
    
    return(
        <div>
            <GoogleLogout
                clientId={googleClientId}
                buttonText="Logout"
                icon={false}
                onLogoutSuccess={()=>handleLogOutAction()}
            >
                <Button
                        onClick={handleLogOutAction}
                        variant="contained"
                        color="secondary"
                        type="button"
                        //class="login-with-google-btn"
                >
                ログアウト
                </Button>
            </GoogleLogout>

        </div>
  
    )
}


     