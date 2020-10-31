import React from "react"
import Layout from '../components/layout'
import Article from '../components/article/article'
import styles from './articles.module.css'

const ArticlesPage = (props) => {
  
  return (
    <Layout location={props.location}>
      <ul className={styles.articles}>
        {
          props.data.allContentfulArticle.edges.map(({node: article}) => (
            <li>
              <Article title={article.title} link={article.link} 
                image={article.image.file.url} description={article.shortDescription.shortDescription}></Article>
            </li>
          ))
        }
      </ul>
    </Layout>
    
  );
}

export default ArticlesPage;

// The result of this GraphQL query will be injected as props.data into the
// IndexPage component.
export const query = graphql`
  query {
    allContentfulArticle(sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          shortDescription {
            shortDescription
          }
          image {
            file {
              url
            }
          }
          link
        }
      }
    }
  }
`;