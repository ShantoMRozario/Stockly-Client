import { useState } from "react";
import { Link } from "react-router-dom";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";
import { Oval } from "react-loader-spinner";
import { loginRequest } from "../../Api/UserApiRequest";
import { toast } from "react-toastify";
import ButtonLoader from "../../Utilities/ButtonLoader";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loader, setLoader] = useState(false);

  const validateEmail = (input) => {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input);
  };

  const validatePassword = (input) => {
      // Regular expression for password validation (at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one of the special characters * - + /)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*\-+\/])[A-Za-z\d*\-+\/]{8,}$/;
      return passwordRegex.test(input);
  };

  const handleSubmit = async(e) => {
      e.preventDefault();

      // Resetting errors
      setEmailError('');
      setPasswordError('');

      // Email validation
      if (!validateEmail(email)) {
          setEmailError('Invalid email format');
      }

      // Password validation
      if (!validatePassword(password)) {
          setPasswordError('Invalid password format (at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one of the special characters * - + /)');
      }

      else{
        setLoader(true);
        let result = await loginRequest(email, password);
        if(result == true){
          setLoader(false);
          toast.success('Login Successful');
          window.location.href = '/';
        }
        else{
          setLoader(false);
          if(result.message == 'User Does Not Exist'){
            setEmailError('User Does Not Exist');
          }
          else if(result.message == 'Invalid Password'){
            setPasswordError('Invalid Password');
          }
        }

      }
    }
  

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}> 
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            <div className="mb-6 relative" >
              <label className="block text-gray-700">Password</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="absolute right-2 top-[50%] focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                <PiEyeBold />
                 : 
                <PiEyeClosed />}
              </button>
            </div>
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
              {
                loader
                ?
                <ButtonLoader/>
                :
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                  Login
                </button>
              }
          </form>
          <p className="mt-4 text-center">
            
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password? 
            </Link>
          </p>
          <p className="mt-4 text-center">
            Don't have an account? 
            <Link to="/registration" className="text-blue-500 hover:underline">
            Register
            </Link>
          </p>
        </div>
      </div>
    );
}

export default Login;