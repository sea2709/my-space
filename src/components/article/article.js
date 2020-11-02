import React from 'react';
import styles from './article.module.css';

const Article = (props) => {
  return (
    <div className={styles.article}>
      <div className={styles.image} style={{backgroundImage: "url(" + props.image + ")"}} />
      <div className={styles.content}>
        <div className={styles.title}>
          <a href={props.link} target="_link">{props.title}</a>
        </div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.link}><a href={props.link} target="_link">Go to article</a></div>
        {
          props.curator ? (<div className={styles.curator}>From {props.curator}</div>) : ''
        }
      </div>
    </div>
  );
  
};

export default Article;