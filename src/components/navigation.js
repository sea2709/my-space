import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName={styles.active}>Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/articles/" activeClassName={styles.active}>My Favourite Articles</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/share/" activeClassName={styles.active}>Share With Me</Link>
      </li>
    </ul>
  </nav>
)
