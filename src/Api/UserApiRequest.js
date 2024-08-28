import { toast } from "react-toastify";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { setAuthToken, setEmail, setOtp, setUserData } from "../Helper/SessionHelper";

//Registration API
export async function registrationRequest(email, password) {
    try{
        let url = BASE_URL + "/registration";
        let postBody = {
            email,
            password        
        }

        let response = await axios.post(url, postBody);
        if(response.status === 200){
            if(response.data.status === 'Failed'){
                if(response.data.data.keyPattern.email === 1){
                    toast.error('Email already exists');
                    return false
                }
                else{
                    toast.error('Something went wrong3');
                    return false
                }
            }
            else{
                toast.success('Registration Successful');
                return true
            }
        }
        else{
            toast.error('Something went wrong2');
            return false
        }
    }
    catch(error){
        toast.error('Something went wrong1');
    }
}

//Login API
export async function loginRequest(email, password) {
    try{
        let url = BASE_URL + "/login";
        let postBody = {
            email,
            password
        }
        let response = await axios.post(url, postBody);
        if(response.status === 200){
            if(response.data.status === 'Failed'){
                if(response.data.data === 'User Does Not Exist'){
                    toast.error('User Does Not Exist');
                    return {message: 'User Does Not Exist'}
                }
                else if(response.data.data === 'Invalid Password'){
                    toast.error('Invalid Password');
                    return {message: 'Invalid Password'}
                }
                else{
                    toast.error('Something went wrong');
                    return false
                }
            }
            else{
                setAuthToken(response.data.token);
                setUserData(response.data.data);
                return true
            }
        }
        else{
            toast.error('Something went wrong');
        }
    }
    catch(error){
        toast.error('Something went wrong');
    }
}

//Send Email Otp API
export async function sendEmailOtpRequest(email) {
    try{
        let url = BASE_URL + `/emailVerify/${email}`;
        let response = await axios.get(url);
        if(response.status === 200){
            if(response.data.status === 'Failed'){
                toast.error('Something went wrong');
                return false
            }
            else{
                toast.success('OTP Sent to your email');
                setEmail(email);
                return true
            }
        }
        else{
            toast.error('Something went wrong');
        }

    }
    catch(error){
        toast.error('Something went wrong');
    }
}

//Otp Verification API
export async function otpVerificationRequest(email,otp) {
    try{
        let url = BASE_URL + `/otp-Verify/${email}/${otp}`;
        let response = await axios.get(url);

        if(response.status === 200){
            if(response.data.status === 'Failed'){
                toast.error('Invalid OTP');
                return false
            }
            else{
                setOtp(otp);
                return true
            }
        }
        else{
            toast.error('Something went wrong');
        }
    }
    catch(error){
        toast.error('Something went wrong');
    }
}

//Reset Password API
export async function resetPasswordRequest(email,otp, password) {
    try{
        let url = BASE_URL + '/resetPassword';
        let postBody = {
            email,
            otp,
            password
        }

        let response = await axios.post(url, postBody);

        if(response.status === 200){
            if(response.data.status === 'Failed'){
                toast.error('Something went wrong');
                return false
            }
            else{
                toast.success('Password Reset Successful');
                return true
            }
        }
        else{
            toast.error('Something went wrong');
        }
    }
    catch(error){
        toast.error('Something went wrong');
    }
        
}