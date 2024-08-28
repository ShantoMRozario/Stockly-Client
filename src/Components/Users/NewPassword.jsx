import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import ButtonLoader from "../../Utilities/ButtonLoader";
import { resetPasswordRequest } from "../../Api/UserApiRequest";
import { getEmail, getOtp } from "../../Helper/SessionHelper";

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (input) => {
    // Regular expression for password validation (at least 8 characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*\-+\/])[A-Za-z\d*\-+\/]{8,}$/;
      return passwordRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting errors
    setPasswordError('');
    setConfirmPasswordError('');

    // Password validation
    if (!validatePassword(password)) {
      setPasswordError('Invalid password format (at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one of the special characters * - + /)');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setLoader(true);
      let result = await resetPasswordRequest(getEmail(),getOtp(), password);

      if(result === true){
        setLoader(false);
        navigate('/login');
        localStorage.clear(getEmail(), getOtp());
      }
      else{
        setLoader(false);
        setPasswordError('Something went wrong');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your new password"
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
          <div className="mb-4 relative">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" className="absolute right-2 top-[50%] focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? 
              <PiEyeBold />
               : 
              <PiEyeClosed />}
            </button>
          </div>
            {confirmPasswordError && <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>}
          {
            loader
              ? <ButtonLoader/>
              : <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                Reset Password
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

export default NewPassword;
