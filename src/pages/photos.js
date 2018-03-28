import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { compose } from 'recompose';
import Lightbox from 'react-image-lightbox';
import Img from "gatsby-image";
import styled from 'styled-components';

import Main from "../components/Main/";
import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";

const Masonry = require( 'react-masonry-component' );

const styles = theme => ({
  article: {
    // maxWidth: theme.main.sizes.articleMaxWidth,
    margin: "0 auto",
    padding: `calc(${theme.bars.sizes.infoBar}px + 1.5rem) 1.5rem  1.5rem 1.5rem`,
    "& strong, & b": {
      letterSpacing: "-.02em"
    },
    "& a": {
      fontWeight: "bold",
      letterSpacing: "-.02em",
      textShadow: `
           2px  2px ${theme.main.colors.background},
          -2px  2px ${theme.main.colors.background},
          -2px -2px ${theme.main.colors.background},
          -2px  2px ${theme.main.colors.background},
          -2px  0   ${theme.main.colors.background},
           2px  0   ${theme.main.colors.background}
        `,
      display: "inline-block",
      textDecoration: "none",
      transition: "0.3s",
      "&:hover": {
        color: theme.base.colors.linkHover
      }
    },
    [ `@media (min-width: ${theme.mediaQueryTresholds.M}px)` ]: {
      padding: `calc(2.5rem + ${theme.bars.sizes.infoBar}px) 3.5rem 2.5rem`
    },
    [ `@media (min-width: ${theme.mediaQueryTresholds.L}px)` ]: {
      padding: "3.5rem"
    }
  }
});

const BoxyDiv = styled.div`

transition-property: box-shadow;
transition-duration: 0.3s;
cursor: pointer;

&:hover {
-webkit-box-shadow: 0px 0px 14px 1px rgba(148,148,148,0.71);
-moz-box-shadow: 0px 0px 14px 1px rgba(148,148,148,0.71);
box-shadow: 0px 0px 14px 1px rgba(148,148,148,0.71);
}
`;

const masonryOptions = {
  gutter: 10
};

class Photos extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind( this );
  
  constructor( props ){
    super( props );
    
    this.state = {
      isOpen: false,
      photoIndex: 0
    };
  }
  
  componentDidMount(){
    this.moveNavigatorAside();
    this.props.setNavigatorShape( 'closed' );
  }
  
  openLightbox = ( index ) =>{
    this.setState( {
      isOpen: true,
      photoIndex: index
    } );
  };
  
  getCaption = () =>{
    const { data: { photos: { edges: images } } } = this.props;
    const { photoIndex }                          = this.state;
    
    let caption = null;
    
    const exif = images[ photoIndex ].node.fields.exif;
    
    if(exif.location !== null) {
      caption = exif.location;
    }
    
    let hasAnyTechnical = false;
    
    caption = Object.keys( exif.technical ).reduce( ( acc, curr ) =>{
      
      if(exif.technical[ curr ] !== null) {
        
        if(hasAnyTechnical === false) {
          hasAnyTechnical = true;
          
          if(acc !== null) {
            return acc.concat( ` -- ${curr}: ${exif.technical[ curr ]}` );
          }
          return `${curr}: ${exif.technical[ curr ]}`;
        }
        
        return acc.concat( ` || ${curr}: ${exif.technical[ curr ]}` );
      }
      return acc;
    }, caption );
    
    return caption;
  };
  
  render(){
    const { data: { photos: { edges: images } }, classes } = this.props;
    const { photoIndex, isOpen }                           = this.state;
    
    const mainSrc    = images[ photoIndex ].node.original.src;
    const nextSrc    = photoIndex + 1 === images.length ? null : images[ (photoIndex + 1)].node.original.src;
    const prevSrc    = photoIndex - 1 < 0 ? null : images[ (photoIndex - 1) ].node.original.src;
    const imageTitle = images[ photoIndex ].node.fields.exif.title === null ? 'Untitled' : images[ photoIndex ].node.fields.exif.title;
    
    const children = images.map( ( node, index ) =>{
      return (<BoxyDiv onClick={() => this.openLightbox( index )} key={index}><Img resolutions={node.node.resolutions}/></BoxyDiv>);
    } );
    
    return (
      <Main>
        {isOpen && (
          <Lightbox
            mainSrc={mainSrc}
            nextSrc={nextSrc}
            prevSrc={prevSrc}
            imageTitle={imageTitle}
            imageCaption={this.getCaption()}
            onCloseRequest={() => this.setState( { isOpen: false } )}
            onMovePrevRequest={() =>
              this.setState( {
                photoIndex: (photoIndex + images.length - 1) % images.length,
              } )
            }
            onMoveNextRequest={() =>
              this.setState( {
                photoIndex: (photoIndex + 1) % images.length,
              } )
            }
          />
        )}
        <div className={classes.article}>
          <Masonry options={masonryOptions}>{children}</Masonry>
        </div>
      </Main>
    );
  }
}

Photos.propTypes = {
  data: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired
};

const mapStateToProps = ( state, ownProps ) =>{
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
};

const composed = compose(
  injectSheet( styles ),
  connect( mapStateToProps, mapDispatchToProps )
);

export default composed( Photos );

//eslint-disable-next-line no-undef
export const guery = graphql`
  query PhotosQuery {
    photos: allImageSharp(filter: { id: { regex: "//pictures//" } }) {
       edges {
          node {
            original {
              width
              height
              src
            },
            sizes(maxWidth: 1600) {
              src,
              srcSet,
              sizes
            },
            resolutions(width: 200) {
            src,
            srcSet,
            width,
            height,
            aspectRatio,
            base64
            }
            fields {
              exif {
                title
                location
                categories
                technical {
                  iso
                  model
                  fstop
                  focalLength
                }
              }
            }
          }
      }
    }
  }
`;
