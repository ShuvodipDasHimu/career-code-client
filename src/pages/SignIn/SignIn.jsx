import React, { use } from 'react';
import signInLottie from '../../assets/lotties/signin.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin'

const SignIn = () => {

  const {signIn} = use(AuthContext)
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const from = location.state || '/';

  const handleSignIn = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // sign in user
    signIn(email, password)
    .then(result => {
      console.log(result.user)
      navigate(from);
    })
    .catch(error=>{
      console.error(error)
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <Lottie style={{width: '200px'}} animationData={signInLottie} loop={true}></Lottie>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Sign In now!</h1>
          <form onSubmit={handleSignIn}>
            <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Sign In</button>
            </fieldset>
          </form>
          <SocialLogin from={from}></SocialLogin>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignIn;