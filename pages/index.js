import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <h1 className={styles.title}>
          GoosFraba Exercise
        </h1>



        <div className={styles.grid}>
          <a href="/posts" className={styles.card}>
            <h3 style={{ width: '300px' }}>Spre grafic &rarr;</h3>
          </a>

        </div>
      </main>


    </div>
  )
}
