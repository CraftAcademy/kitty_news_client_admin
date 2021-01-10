import React from 'react'
import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector(state => state.currentUser)
  return (
    <div>
      <h2 data-cy="header-user-email">
        {currentUser
          ? `Meow! Welcome back ${currentUser.uid}`
          : "Woof! You're not logged in."
        }
      </h2>
    </div>
  )
}

export default Header
