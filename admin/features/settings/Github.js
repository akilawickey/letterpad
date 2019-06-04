import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import Button from "../../components/button";
import Input from "../../components/input";

class Github extends Component {
  state = {
    processing: false,
  };

  updateOption = (option, value) => {
    this.props.updateOption(option, value);
  };

  createStaticFiles = async () => {
    this.setState({ processing: true });
    await fetch("http://localhost:4040/generate-static-site")
      .then(res => res.json())
      .then(() => {
        this.setState({ processing: false });
      });
  };

  render() {
    // const { t } = this.props;

    return (
      <div>
        {this.state.processing && <span>Generating static assets...</span>}
        <Input
          label="Github Token"
          defaultValue={this.props.data.github_token.value}
          type="text"
          onBlur={e => this.updateOption("github_token", e.target.value)}
        />
        <Button success onClick={this.createStaticFiles}>
          Save
        </Button>
      </div>
    );
  }
}

Github.propTypes = {
  data: PropTypes.object,
  updateOption: PropTypes.func,
  t: PropTypes.func,
};

Github.defaultPropTypes = {
  data: JSON.stringify({
    text_notfound: "",
  }),
};

export default translate("translations")(Github);
