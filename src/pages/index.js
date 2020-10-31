import React from 'react'
import Layout from '../components/layout'
import styles from './index.module.css'

class IndexPage extends React.Component {
  render() {
    
    return (
      <Layout location={this.props.location}>
        <div className={styles.introduction}>
          <div>Hi,</div>
          <div>I am <span className={styles.name}>Dang Tran</span>,</div>
          <div>a web developer!</div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage


