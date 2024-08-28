import { useState } from "react";
import { Oval } from "react-loader-spinner";// This should be your API request function
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmailOtpRequest } from "../../Api/UserApiRequest";
import ButtonLoader from "../../Utilities/ButtonLoader";

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting errors
    setEmailError('');

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
    } 
    else {
      setLoader(true);
      let result = await sendEmailOtpRequest(email);

      if (result === true) {
        setLoader(false);
        navigate ('/otp-verification'); 
      } else {
        setLoader(false);
        setEmailError('Email does not exist');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
          </div>
          {
            loader
              ? 
              <ButtonLoader/>
              : <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                Submit
              </button>
          }
        </form>
        <p className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
