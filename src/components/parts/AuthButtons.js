import axios from "axios";
import { API_URL } from "../../lib/ServiceConfig";
import { Typography } from "@material-ui/core";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import {CONNECT_ERROR,ERROR_RESET, MEMO_END} from '../../lib/ActionTypeString';


const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;

export const LoginButton=({red, callback})=>{
    const [redirect ,setRedirect]=useState(red);
    const dispatch = useDispatch();
    const history=useHistory();
    const LOGIN_URL=`${API_URL}/auth/convert-token`;

    const SetAuthConnection = (response) => {
        //console.log("LOGI_N_URL ",LOGIN_URL);
        //console.log(drfClientId,drfClientSecret);
        axios.post(LOGIN_URL, {
            token: response.accessToken,
            backend: "google-oauth2",
            grant_type: "convert_token",
            client_id: drfClientId,
            client_secret: drfClientSecret,
        })
        .then((res) => {
            const { access_token, refresh_token } = res.data;
            //console.log(access_token,refresh_token)
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            
            history.push("/main");
        })
        .catch((err) => {
            //console.log("Error Google login", err);
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


     