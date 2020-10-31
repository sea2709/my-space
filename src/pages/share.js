import React from "react"
import Layout from '../components/layout'
import { graphql } from "gatsby"

import styles from './share.module.css'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validUrlRegex = RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const generateId = (length = 22) => {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        config {
          managementAccessToken
          spaceId
          nodeType
        }
      }
    }
  }
`

class SharePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      form: {
        name: '', 
        email: '', 
        url: '', 
      },
      message: '',
      errors: {
        name: '',
        email: '',
        url: ''
      },
      required: ['name', 'url']
    };
  }

  handleOnChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name': 
        errors.name = 
          value.length == 0
            ? 'Name is required!'
            : '';

        break;

      case 'email': 
        if (value.length > 0) {
          errors.email = 
            validEmailRegex.test(value)
              ? ''
              : 'Email is not valid!';
        } else {
          errors.email = '';
        }

        break;

      case 'url': 
        if (value.length > 0) {
          errors.url = 
            validUrlRegex.test(value)
              ? ''
              : 'News URL is not valid';
        } else {
          errors.url = 'News URL is required!';
        }
        break;

      default:
        break;
    }
    let form = {
      ...this.state.form,
      [name]: value
    };

    this.setState({errors, 'form': form});
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    
    this.setState({
      'message': ''
    });

    if (validateForm(this.state.errors)) {
      console.log(this.props.data);
      const contentful = require('contentful-management')
      const client = contentful.createClient({
        accessToken: this.props.data.site.siteMetadata.config.managementAccessToken
      });

      // Create entry
      client.getSpace(this.props.data.site.siteMetadata.config.spaceId)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        let id = generateId();
        environment.createEntryWithId(this.props.data.site.siteMetadata.config.nodeType, id, {
          fields: {
            title: {
              'en-US': 'Entry #' + id
            },
            curator: {
              'en-US': this.state.form.name
            },
            curatorsEmail: {
              'en-US': this.state.form.email
            },
            link: {
              'en-US': this.state.form.url
            }
          }
        }).then((entry) => {
          this.setState({
            'message': 'Thank you for sharing <3 <3 <3',
            'form': {
              'url': '',
              'name': '',
              'email': ''
            }
          });
          console.log(entry);
        });
      })
      .catch(console.error);
    }
  }

  filledOutRequiredFields = () => {
    for (let v of Object.values(this.state.required)) {
      if (this.state.form[v] == '') {
        return false;
      }
    } 

    return true;
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <div className={styles.content}>
          <form onSubmit={this.handleOnSubmit.bind(this)} method="POST">
            <div className={styles.row}>
              <div className={styles.element}>
                <input name="name" type="text" placeholder="Your Name (*)" 
                  onChange={this.handleOnChange.bind(this)} value={this.state.form.name} />
                <div className={styles.error}>{this.state.errors['name']}</div>
              </div>
              <div className={styles.element}>
                <input name="email" type="email" placeholder="Your Email" 
                  onChange={this.handleOnChange.bind(this)} value={this.state.form.email} />
                <div className={styles.error}>{this.state.errors['email']}</div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.element}>
                <input name="url" type="text" placeholder="Your Favourite News URL (*)" 
                  onChange={this.handleOnChange.bind(this)} value={this.state.form.url} />
                <div className={styles.error}>{this.state.errors['url']}</div>
              </div>
            </div>
            <div className={[styles.row, styles.actions].join(' ')}>
              <button type="submit" disabled={!this.filledOutRequiredFields()}>
                Share Article
              </button>
            </div>
          </form>
          <div className={styles.message}>{this.state.message}</div>
        </div>
      </Layout>
    );
  }
}

export default SharePage;