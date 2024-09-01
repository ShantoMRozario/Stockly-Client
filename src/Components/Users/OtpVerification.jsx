
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VerificationInput from "react-verification-input";
import { otpVerificationRequest } from "../../Api/UserApiRequest";
import { getEmail } from "../../Helper/SessionHelper";
import ButtonLoader from "../../Utilities/ButtonLoader";

const  OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting errors
    setOtpError('');

        // OTP validation
        if (otp.length === 6) {
          setLoader(true);
          let result = await otpVerificationRequest(getEmail(),otp);
          if (result === true) {
            setLoader(false);
            navigate('/new-password');
            setOtp('');
          }
          else {
            setLoader(false);
            setOtpError('Invalid OTP');
          }
        }
        else {
          setOtpError('Please enter a valid OTP');
          toast.warning('Please enter a valid OTP');
    
        }
    }
    


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">OTP</label>
            <VerificationInput 
            onChange={(e) => setOtp(e)}
            fields = {6}
            validChars="0-9"
            placeholder=""
            
            />
            {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
          </div>
          {
            loader
              ? 
              <ButtonLoader/>
              : <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                Verify OTP
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

export default OTPVerification;
