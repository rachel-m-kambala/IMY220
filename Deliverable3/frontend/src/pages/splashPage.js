//Mukaji Mweni Rachel Kambala u23559129 position-24

import React, { useState } from 'react';
import LoginForm from '../components/authentication/loginForm.js';
import SignupForm from '../components/authentication/signupForm.js';

const SplashPage = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            CODESYNC
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 tracking-wide">
            CODE. SYNC. REPEAT.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full mb-16">
          <div className="text-center p-8 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Your main branch is waiting.</h3>
            </div>
            <button
              onClick={() => setShowLogin(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg w-full transition-colors duration-200"
            >
              SIGN UP
            </button>
          </div>
          
          <div className="text-center p-8 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Ready to commit?</h3>
            </div>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg w-full transition-colors duration-200"
            >
              LOG IN
            </button>
          </div>
        </div>
        
        {(showLogin !== null) && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-8 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {showLogin ? 'LOGIN' : 'SIGN UP'}
                </h2>
                <button
                  onClick={() => setShowLogin(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              {showLogin ? (
                <LoginForm 
                  onSuccess={onLogin} 
                  switchToSignup={() => setShowLogin(false)} 
                />
              ) : (
                <SignupForm 
                  onSuccess={onLogin} 
                  switchToLogin={() => setShowLogin(true)} 
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashPage;