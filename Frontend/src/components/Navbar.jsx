import React from 'react'
import { Link } from 'react-router-dom';
import { MessageSquare, Settings, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Left Section - Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-5 text-primary" /> 
          </div>
          <h1 className='text-lg font-bold'>Blink</h1>
        </Link>

        {/* Right Section - Buttons */}
        <div className="flex items-center gap-3">

          {/* Settings Button */}
          <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {/* Show only if user is logged in */}
          {authUser && (
            <>
              {/* Profile Button with User Name */}
              <Link to="/profile" className="btn btn-sm gap-2 flex items-center">
                <User className='size-5' />
                <span className='hidden sm:inline'>{authUser.fullName}</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="btn btn-sm gap-2 flex items-center transition-colors"
              >
                <LogOut className='size-5' />
                <span className='hidden sm:inline'>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
