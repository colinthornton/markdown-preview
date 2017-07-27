import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

const defaultText = "GitHub Markdown Preview\n=======\n\nYou can edit the text field\n-----------\n\n### And the preview will update in realtime\n***\n\nPress return\nto move to the next line\n***\n\nPress return twice\n\nfor a line break\n***\n\nText attributes: *italic*, **bold**, `monospace`, ~~strikethrough~~\n***\n\nUnordered List of Japanese Words\n\n* 恋\n* 愛\n* 無駄\n***\n\nOrdered List of the Best Colors\n\n1. red\n2. blue\n3. slightly darker red\n***\n\nMade by [Colin Thornton](https://colinthornton.github.io) with [Marked](https://github.com/chjj/marked)"

marked.setOptions({
  gfm: true,
  breaks: true,
  tables: true,
  sanitize: true,
  smartypants: true
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      markdownInput: defaultText,
      markdownOutput: {
        __html: marked(defaultText)
      }
    };
  }  
  handleInput(event) {
    this.setState({
      markdownInput: event.target.value,
      markdownOutput: {
        __html: marked(event.target.value)
      }
    });
  }    
  render() {
    return (
      <div className="row">
        <MarkdownInput
          markdownInput={this.state.markdownInput}
          handleInput={this.handleInput} 
        />
        <MarkdownOutput 
          markdownOutput={this.state.markdownOutput}
        />
      </div>
    );
  }
}

class MarkdownInput extends Component {
  render() {
    return (
      <div className="col-md-6">
        <textarea 
          value={this.props.markdownInput}
          onChange={this.props.handleInput} 
          autofocus
        />
      </div>
    );
  }
}

class MarkdownOutput extends Component {
  render() {
    return (
      <div 
        className="col-md-6 well"
        id="preview"
        dangerouslySetInnerHTML={this.props.markdownOutput} 
      />
    );
  }
}

export default App;
