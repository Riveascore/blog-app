import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class PostsNew extends Component {
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
      <form onSubmit={handleSubmit}>
        <h3>
          Create a New Post
        </h3>
        <div className="form-group">
          <label>
            Title
          </label>
          <input type="text" className="form-control" {...title} />
        </div>
        <div className="form-group">
          <label>
            Categories
          </label>
          <input type="text" className="form-control"  {...categories} />
        </div>
        <div className="form-group">
          <label>
            Content
          </label>
          <textarea className="form-control" {...content} />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
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
export default reduxForm({
  form: 'PostsNewForm',
  // Tells reduxForm to watch for these inputs
  fields: [
    'title',
    'categories',
    'content'
  ]
})(PostsNew);
