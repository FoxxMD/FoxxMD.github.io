import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { MenuItem, MenuList } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import { Manager, Target, Popper } from "react-popper";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import Grow from "material-ui/transitions/Grow";
import Paper from "material-ui/Paper";
import classNames from "classnames";
import FilterListIcon from "material-ui-icons/FilterList";

const styles = theme => ({
  fontSizeSetter: {
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
  },
  buttonRoot: {
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)"
    }
  },
  buttonLabel: {
    textTransform: "none",
    fontSize: "1.4em",
    color: "#777"
  },
  popperClose: {
    pointerEvents: "none"
  },
  popper: {
    zIndex: 1
  }
});

class CategoryFilter extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };

  handleFiltering = (type, e) => {
    const category = e.target.innerText.trim();
    this.props.filterCategory(type, category);
    this.handleClose();
  };
  
  generateBlogCategories = () => {
    return (<MenuList role="menu">
      <MenuItem key="all" onClick={(e) => this.handleFiltering('blog', e)}>
        all posts
      </MenuItem>
      {this.props.blogCategories.map(category => (
        <MenuItem key={category} onClick={(e) => this.handleFiltering('blog', e)}>
          {category}
        </MenuItem>
      ))}
    </MenuList>);
  }
  
  generatePhotoCategories = () => {
    return (<MenuList role="menu">
      <MenuItem key="all" onClick={(e) => this.handleFiltering('photos', e)}>
        all photos
      </MenuItem>
      {this.props.photoCategories.map(category => (
        <MenuItem key={category} onClick={(e) => this.handleFiltering('photos', e)}>
          {category}
        </MenuItem>
      ))}
    </MenuList>)
  }

  render() {
    const { classes, photosOpen } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <nav className={classes.fontSizeSetter}>
        <Manager>
          <Target>
            <IconButton
              aria-label="Filter by category"
              aria-owns={anchorEl ? "long-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              title="Filter the list by category"
            >
              <FilterListIcon />
            </IconButton>
          </Target>
          <Popper
            placement="bottom-end"
            eventsEnabled={open}
            className={`${classNames({ [classes.popperClose]: !open })} ${classes.popper}`}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="cat-menu-list" style={{ transformOrigin: "0 0 0" }}>
                <Paper>
                  {photosOpen ? this.generatePhotoCategories() : this.generateBlogCategories()}
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </nav>
    );
  }
}

CategoryFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  blogCategories: PropTypes.array.isRequired,
  photoCategories: PropTypes.array.isRequired,
  filterCategory: PropTypes.func.isRequired,
};

export default injectSheet(styles)(CategoryFilter);
