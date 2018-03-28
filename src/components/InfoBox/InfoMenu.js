import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";
import {compose} from 'recompose';
import { connect } from "react-redux";
import { featureNavigator } from "./../../utils/shared";
import {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter
} from "../../state/store";

const styles = theme => ({
  infoMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    width: "100%"
  },
  link: {
    padding: ".5em",
    fontWeight: 300,
    fontTransform: "lowercase",
    color: theme.info.colors.menuLink,
    "&:hover": {
      color: theme.info.colors.menuLinkHover
    }
  }
});

class InfoMenu extends React.Component {
  
  blogOnClick = featureNavigator.bind(this);
  
  render() {
    const { classes, pages, linkOnClick } = this.props;
    
    return (
      <nav className={classes.infoMenu}>
        {pages.map((page, i) => {
          const { fields, frontmatter } = page.node;
          return (
            <Link
              key={fields.slug}
              to={fields.slug}
              onClick={linkOnClick}
              className={classes.link}
              data-shape="closed"
            >
              {frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}
            </Link>
          );
        })}
        <Link to="/photos/" onClick={linkOnClick} className={classes.link} data-shape="closed">
          Photos
        </Link>
        <a style={{cursor: 'pointer'}} onClick={this.blogOnClick} className={classes.link} data-shape="open">Blog</a>
        <Link to="/contact/" onClick={linkOnClick} className={classes.link} data-shape="closed">
          Contact
        </Link>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    isWideScreen: state.isWideScreen,
  };
};

InfoMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired
};

const composed = compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
);

export default composed(InfoMenu);
