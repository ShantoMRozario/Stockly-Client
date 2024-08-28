
//set auth token
const setAuthToken = (token) =>{
    localStorage.setItem('authToken', token);
}

//get auth token
const getAuthToken = ()=>{
    return localStorage.getItem('authToken');
}

//set email
const setEmail = (email) =>{
    localStorage.setItem('email', email);
}

//get email
const getEmail = ()=>{
    return localStorage.getItem('email');
}

//set otp
const setOtp = (otp) =>{
    localStorage.setItem('otp', otp);
}

//get otp
const getOtp = ()=>{
    return localStorage.getItem('otp');
}

//setUserData
const setUserData = (user) =>{
    localStorage.setItem('userData',JSON.stringify(user))
}

//getUserData
const getUserData = ()=>{
    return JSON.parse(localStorage.getItem('userData'))
}

//Clear session
const logout = ()=>{
    localStorage.clear();
    window.location.href = '/login';
}

export {
    setAuthToken,
    getAuthToken,
    setEmail,
    getEmail,
    setOtp,
    getOtp,
    setUserData,
    getUserData,
    logout
}