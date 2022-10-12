import React, { FC, useEffect, useContext, useState } from 'react'

import { Context } from './index'
import { IUser } from './models/IUser'
import LoginForm from './components/LoginForm'

import { observer } from 'mobx-react-lite'
import UserService from './services/UserService'

const App: FC = () => {

  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return <LoginForm></LoginForm>
  }

  return (
    <div> 
      <h2>{store.isAuth ? `${store.user.email}` : 'You need to sign in'}</h2>
      <h3>{store.user.isActivated ? 'Your account is confirmed' : 'You need to confirm account'}</h3>
      <div><button onClick={() => store.logout()}>Logout</button></div>
      <br></br>
      <div>
        <button onClick={getUsers}>Get Users</button>
      </div>
      <br></br>
      {users.map(user => 
        <div key={user.email}>{user.email}</div>)}
    </div>
  )
}

export default observer(App);
