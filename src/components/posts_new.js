import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // React will search all parent components
  // until it finds a prop "router"
  // then set it to:
  //  this.context.router
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    // This returns a promise
    this.props.createPost(props)
      .then(() => {
        // Blog post has been created
        // navigate the user to the index
        // By calling this.context.router.push
        // with the new path to navigate to

        this.context.router.push('/');
      });
  }

  render() {
    const {
      fields: {
        title,
        categories,
        content
      },
      handleSubmit
    } = this.props;

    return (
      // If the form is valid "onSubmit"
      // this.props.createPost will be called with the form values
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>
          Create a New Post
        </h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>
            Title
          </label>
          <input type="text" className="form-control" {...title} />
          <div className="form-control-feedback">
            {title.touched ? title.error : ""}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>
            Categories
          </label>
          <input type="text" className="form-control"  {...categories} />
          <div className="form-control-feedback">
            {categories.touched ? categories.error : ""}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>
            Content
          </label>
          <textarea className="form-control" {...content} />
          <div className="form-control-feedback">
            {content.touched ? content.error : ""}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-default">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Title can't be blank";
  }
  if (!values.categories) {
    errors.categories = "Enter Categories";
  }
  if (!values.content) {
    errors.content = "Enter Some Content";
  }

  return errors;
}

// When User types something in... reduxForm records it on application state
// Pulls component state onto application state

// state === {
//   form: {
//     PostsNewForm: {
//       title: '.....',
//       categories: '.....',
//       content: '.....',
//     }
//   }
// }

// connect:
//  1st is mapStateToProps
//  2nd is mapDispatchToProps
//
// reduxForm
//  1st is form config
//  2nd is mapStateToProps
//  3rd is mapDispatchToProps

// Can be used similarly as connect()
// can inject action creators into component
// and create a container
export default reduxForm({
  form: 'PostsNewForm',
  // Tells reduxForm to watch for these inputs
  fields: [
    'title',
    'categories',
    'content'
  ],
  validate
}, null, { createPost })(PostsNew);
