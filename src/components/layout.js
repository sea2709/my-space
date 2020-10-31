import React from 'react'
import { Helmet } from "react-helmet"
import { Link, StaticQuery, graphql } from 'gatsby'
import base from './base.css'
import styles from './layout.module.css'
import Navigation from './navigation'

const Layout = (props) => {
  const {children} = props;

  return (
    <StaticQuery
      query={graphql`
        query Query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {name: 'description', content: 'Sample'},
              {name: 'keywords', content: 'sample, something'},
            ]}
          >
            <html lang="en"/>
            <meta charSet="utf-8" />
          </Helmet>
          <div className={styles.wrapper}>
            <Navigation></Navigation>
            <div className={styles.content}>{children}</div>
            <div className={styles.footer}>
              <div className={styles.email}>
                <a href="mailto:hdang.sea@gmail.com">hdang.sea@gmail.com</a> | Dallas, TX 75010</div>
              <div className={styles.socialMedia}>
                <a href="https://www.linkedin.com/in/hdangtran/" target="_blank">LinkedIn</a>
                &nbsp;|&nbsp;
                <a href="https://www.facebook.com/sea2709/" target="_blank">Facebook</a>
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default Layout;
