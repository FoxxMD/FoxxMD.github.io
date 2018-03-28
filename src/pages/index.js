import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { featureNavigator } from "../utils/shared";
import Seo from "../components/Seo";
import Page from "../components/Page/";

class Index extends React.Component {
  featureNavigator = featureNavigator.bind(this);

  componentWillMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.props.setNavigatorPosition("is-aside");
      this.props.setNavigatorShape("closed");
   }
  }

  render() {
    const { data } = this.props;
    //debugger;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <div>
        <Page page={data.page} />
        <Seo facebook={facebook} />
      </div>
    );
  }
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexQuery {
  page: markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      html
      frontmatter {
        title
      }
    }
    footnote: markdownRemark(id: { regex: "/footnote/" }) {
      id
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
