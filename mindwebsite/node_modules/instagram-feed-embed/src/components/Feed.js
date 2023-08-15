import React, { Component } from "react";
import Instagram from "./../lib/Instagram";

class Feed extends Component {
  static defaultProps = {
    getFeedFn: Instagram.getFeed,
    limit: 12,
    width: 320,
    maxContainerHeight: 510,
  };

  constructor(props) {
    super(props);

    this.state = { media: [] };
  }

  componentDidMount() {
    this.props
      .getFeedFn(this.props.userName)
      .then((media) =>
        this.setState({
          loading: false,
          media: media.slice(0, this.props.limit),
        })
      )
      .catch((error) => this.setState({ error }));
  }

  render() {
    if (this.props.userName === undefined)
      return <h4>username is undefined</h4>;
    return (
      <div
        style={{
          overflowY: "auto",
          margin: "auto",
          maxHeight: `${this.props.maxContainerHeight}px`,
          maxWidth: `${this.props.width + 20}px`,
        }}
      >
        {this.state.media.map((media, index) => (
          <div
            key={index}
            style={{
              marginBottom: "14px",
            }}
          >
            <iframe
              alt={media.alt}
              height="460"
              src={`${media.url}/embed`}
              width={this.props.width.toString()}
              frameBorder="0"
            ></iframe>
          </div>
        ))}
      </div>
    );
  }
}

export default Feed;
