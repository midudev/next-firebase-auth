import { withAuthUser, useAuthUser } from 'next-firebase-auth'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function Home() {
  const user = useAuthUser()
  console.log(user.id)

  return (
    <div className={styles.container}>
      <h1>Estoy haciendo Auth para Next.js con Firebase 👋</h1>
    </div>
  )
}

export default withAuthUser()(Home)