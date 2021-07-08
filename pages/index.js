import {useState} from 'react'
import { withAuthUser, useAuthUser } from 'next-firebase-auth'
import styles from '../styles/Home.module.css'
import algoliasearch from 'algoliasearch/lite'
import Image from 'next/image'
import Head from 'next/head'
import logos from '../public/logos.jpg'

const APPLICATION_ID = '6T6D6HZUIF'
const SEARCH_API_KEY = 'e52785ab0e3733d83a4618b38a44d65c'
const ALGOLIA_INDEX = 'pro_meneadev_posts'

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX)

function Home() {
  const [results, setResults] = useState(null)

  const performSearch = async (value) => {
    const {hits} = await index.search(value, {
      hitsPerPage: 5
    })

    const results = hits.map(hit => {
      const { objectID: key, href, _highlightResult } = hit
      const { title: { value: title } } = _highlightResult 
      return { key, href, title }
    })

    setResults(results)
  }

  const handleChange = (e) => {
    const {value} = e.target
  
    value === ''
      ? setResults(null)
      : performSearch(value)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Ejemplo Firebase + Algolia</title>
      </Head>
      <Image width='150' height='80' objectFit='contain' src={logos} />
      <h2 className={styles.title}>Ejemplo integración Firestore con Algolia</h2>
      <form className={styles.search}>
        <input placeholder='Busca aquí lo que quieras...' onChange={handleChange} type='search' />

      </form>
      {results === null
        ? null
        : <div className="ais-Hits">
            <ul className={styles.results}>
              {results.map(result => {
                const {key, href, title} = result

                return (
                  <li key={key}>
                    <a href={href}>
                      <h3 dangerouslySetInnerHTML={{ __html: title}} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
      }
    </div>
  )
}

export default withAuthUser()(Home)