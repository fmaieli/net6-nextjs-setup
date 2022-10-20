import { MainContainer } from '../components/layout/MainContainer'
import { Layout } from '../components/layout/Layout'
import '../styles/tailwind.css'
import '../styles/validations.css'
import '../styles/globals.css'
import { User, UserContext } from '../context/user/useUser'
import { useState, useEffect } from 'react'
import { LoadingModal } from '../components/layout/LoadingModal'

const colorStyle = '#F0F0F0'

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_HOST + '/api/account/me', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        let user = new User()
        Object.assign(user, data)
        setUser(user)
      })
  }, [])
  if (!user) return <LoadingModal/>

  return (
    <>
      <UserContext.Provider value={user}>
        <div
          className="myApp font-sans"
          style={{ backgroundColor: colorStyle }}
        >
          <Layout />
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        </div>
      </UserContext.Provider>
    </>
  )
}
