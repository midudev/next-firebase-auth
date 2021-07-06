import {useState} from 'react'
import { withAuthUser, useAuthUser } from 'next-firebase-auth'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('6T6D6HZUIF', '49006d7a1797c2d6564947fd06e8cd08')
const index = client.initIndex('prod_meneadev_posts')

function Home() {
  const user = useAuthUser()
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
      <h1 className={styles.title}>menea.dev</h1>
      <form className={styles.search}>
        <input onChange={handleChange} type='search' />

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