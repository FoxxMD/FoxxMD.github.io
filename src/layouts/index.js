import React from "react";
import injectSheet from "react-jss";
import { MuiThemeProvider } from "material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import theme from "../styles/theme";
import globals from "../styles/globals";

import { setFontSizeIncrease, setIsWideScreen } from "../state/store";

import asyncComponent from "../components/common/AsyncComponent/";
import Loading from "../components/common/Loading/";
import Navigator from "../components/Navigator/";
import ActionsBar from "../components/ActionsBar/";
import InfoBar from "../components/InfoBar/";

import { isWideScreen, timeoutThrottlerHandler } from "../utils/helpers";

const InfoBox = asyncComponent(
  () =>
    import("../components/InfoBox/")
      .then( module =>{
        return module;
      } )
      .catch( error =>{
      } ),
  <Loading
    overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
    afterRight={true}
  />
);

class Layout extends React.Component {
  timeouts   = {};
  categories = [];
  photoCategories = [];
  
  componentDidMount(){
    this.props.setIsWideScreen( isWideScreen() );
    if(typeof window !== "undefined") {
      window.addEventListener( "resize", this.resizeThrottler, false );
    }
  }
  
  componentWillMount(){
    if(typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem( "font-size-increase" );
      
      const inStore = this.props.fontSizeIncrease;
      
      if(inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        this.props.setFontSizeIncrease( inLocal );
      }
    }
    
    this.getCategories();
    this.getPhotoCategories();
  }
  
  getCategories = () =>{
    this.categories = this.props.data.posts.edges.reduce( ( list, edge, i ) =>{
      const category = edge.node.frontmatter.category;
      if(category && !~list.indexOf( category )) {
        return list.concat( edge.node.frontmatter.category );
      }
      else {
        return list;
      }
    }, [] );
  };
  
  getPhotoCategories = () =>{
    this.photoCategories = this.props.data.photos.edges.reduce( ( list, edge ) =>{
      const catArray = edge.node.fields.exif.categories;
      if(catArray.length > 0) {
        return catArray.reduce( ( acc, curr ) =>{
          if(!~acc.indexOf( curr )) {
            return acc.concat( curr );
          }
          return acc;
        }, list );
      }
      return list;
    }, [] );
  };
  
  resizeThrottler = () =>{
    return timeoutThrottlerHandler( this.timeouts, "resize", 500, this.resizeHandler );
  };
  
  resizeHandler = () =>{
    this.props.setIsWideScreen( isWideScreen() );
  };
  
  render(){
    const { children, data } = this.props;
    
    // TODO: dynamic management of tabindexes for keybord navigation
    return (
      <MuiThemeProvider theme={theme}>
        <div
          style={{
            padding: "1px",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden"
          }}
        >
          {children()}
          <Navigator posts={data.posts.edges}/>
          <ActionsBar blogCategories={this.categories} photoCategories={this.photoCategories}/>
          <InfoBar pages={data.pages.edges} parts={data.parts.edges}/>
          {this.props.isWideScreen && <InfoBox pages={data.pages.edges} parts={data.parts.edges}/>}
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps ) =>{
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease
};

export default connect( mapStateToProps, mapDispatchToProps )( injectSheet( globals )( Layout ) );

//eslint-disable-next-line no-undef
export const guery = graphql`
  query LayoutQuery {
    posts: allMarkdownRemark(
      filter: { id: { regex: "//posts//" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            subTitle
            category
            cover {
              children {
                ... on ImageSharp {
                  resolutions(width: 90, height: 90) {
                    ...GatsbyImageSharpResolutions_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { id: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            menuTitle
          }
        }
      }
    }
    parts: allMarkdownRemark(filter: { id: { regex: "//parts//" } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
    photos: allImageSharp(filter: { id: { regex: "//pictures//" } }) {
       edges {
          node {
            fields {
              exif {
                categories
              }
            }
          }
      }
    }
  }
`;