import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { compose } from 'recompose';
import Lightbox from 'react-image-lightbox';
import Img from "gatsby-image";
import styled from 'styled-components';
import moment from 'moment';
import Prando from 'prando';
import {createSelector} from 'reselect';

import Main from "../components/Main/";
import ListHeader from "../components/Navigator/ListHeader";
import { setNavigatorPosition, setNavigatorShape, setPhotosOpen, setCategoryFilter } from "../state/store";
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
    
    this.getImageNodes = createSelector(
      p => p.data.photos.edges,
      p => p.category,
      (edges, category) => {
        // filter nodes down to only those with the active category
        const imageNodes = category === 'all photos' ? edges : edges.filter((edge) => edge.node.fields.exif.categories.includes(category));
        
        // sort nodes into an object of arrays with keys based on the rating of all images in array
        const imageNodesSortedByRating = imageNodes.reduce((acc, imageNode) => {
          const rating = imageNode.node.fields.exif.rating;
          if(acc[rating] === undefined) {
            acc[rating] = [];
          }
          acc[rating].push(imageNode);
          return acc;
        }, {})
        
        // end goal is that 5-star rating photos are shown before 4-rating photos, before n-1 rating photos...
        // and then within each group of photos the order is psuedo-random --
        // based on a seed created from the cumulative hashed strings of each files absolute path in the system
        // so that order doesn't change if metadata changes but only when filenames change or files are added/deleted
        
        // end value is an object with keys that the sequential position of photos on page and value is the image node
        const keyedImagesObject = Object.keys(imageNodesSortedByRating)
          .sort((a,b) => a - b).reverse() // sort ratings numerically, then reverse (so 5,4,3,2,1,0 = no rating, default)
          .reduce((acc, rating) => {
          
          const imagesNodesAtCurrentRating = imageNodesSortedByRating[rating];
          
          // seed an rng using a concatenated string of all hashes from a rating set
          let rng = new Prando(imagesNodesAtCurrentRating.reduce((hashedString, im) => hashedString.concat(im.node.fields.exif.hash.toString()), ''));
          
          // min is the reduction's current length EX 4 5-star ratings and we are current on 4-star set then min = 5
          const min = Object.keys(acc).length+1;
          
          // max is the addition of min and the length of the current set EX 4 5-star ratings and we are current on 4-star set with 7 then max = 12
          const max = imagesNodesAtCurrentRating.length + min;
          
          // initial position from rng
          let position = rng.nextInt(min, max);
          
          for(let imageNode of imagesNodesAtCurrentRating) { // iterate through each node in set
            
            while(acc[position] !== undefined) { // loop while any position in reduction is occupied (has already been filled by previous node in for loop)
              position = rng.nextInt(min, max); // if it is filled generate new position
            }
            acc[position] = imageNode; // once an unfilled position is found, then fill it
          }
          return acc; // finally all positions are filled for the current set
        }, {});
  
        // then get keys and push to an array (should be in sequential order already IE key = index of Object.keys())
        const sortedImageNodes = Object.keys(keyedImagesObject).reduce((acc, key) => {
          acc.push(keyedImagesObject[key]);
          return acc;
        }, []);
        
        return sortedImageNodes;
      }
    )
  }
  
  componentDidMount(){
    this.moveNavigatorAside();
    this.props.setNavigatorShape( 'closed' );
    this.props.setPhotosOpen( true );
  }
  
  componentWillUnmount(){
    this.props.setPhotosOpen( false );
  }
  
  removeFilterOnClick = e =>{
    this.props.setCategoryFilter( "photos", "all photos" );
  };
  
  openLightbox = ( index ) =>{
    this.setState( {
      isOpen: true,
      photoIndex: index
    } );
  };
  
  getCaption = () =>{
    const { photoIndex } = this.state;
    const images         = this.getImageNodes( this.props );
    
    let attributes = [];
    
    const exif = images[ photoIndex ].node.fields.exif;
    
    // date before location makes more sense because the file is more likely to have a date than location
    // so it makes browsing and looking at metadata on caption more consistent
    if(exif.date !== null) {
      attributes.push( moment( exif.date ).year() );
    }
    if(exif.location !== null) {
      attributes.push( exif.location );
    }
    
    const tech = Object.keys( exif.technical ).reduce( ( acc, curr ) =>{
      
      if(exif.technical[ curr ] !== null) {
        switch(curr) {
          case 'fstop':
            acc.push( `f/${exif.technical[ curr ]}` );
            break;
          case 'focalLength':
            if(exif.technical[ 'model' ] !== null) {
              acc.push( `${exif.technical[ curr ]} mm` );
            }
            break;
          case 'model':
            acc.push( `${exif.technical[ curr ]}` );
            break;
          case 'iso':
            acc.push( `ISO ${exif.technical[ curr ]}` );
            break;
        }
      }
      return acc;
    }, [] );
    
    return attributes.concat( tech ).join( ' || ' );
  };
  
  render(){
    const { classes, category } = this.props;
    const { photoIndex, isOpen }                                     = this.state;
    
    const imageNodes = this.getImageNodes(this.props);
    const mainSrc    = imageNodes[ photoIndex ].node.original.src;
    const nextSrc    = photoIndex + 1 === imageNodes.length ? null : imageNodes[ (photoIndex + 1)].node.original.src;
    const prevSrc    = photoIndex - 1 < 0 ? null : imageNodes[ (photoIndex - 1) ].node.original.src;
    const imageTitle = imageNodes[ photoIndex ].node.fields.exif.title === null ? 'Untitled' : imageNodes[ photoIndex ].node.fields.exif.title;
    
    const children = imageNodes.map( ( node, index ) =>{
      return (<BoxyDiv onClick={() => this.openLightbox( index )} key={index}><Img resolutions={node.node.resolutions}/></BoxyDiv>);
    } );
    
    return (
      <Main>
        <div className={classes.article}>
          <ListHeader
            categoryFilter={category}
            removeFilter={this.removeFilterOnClick}
          />
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
                photoIndex: (photoIndex + imageNodes.length - 1) % imageNodes.length,
              } )
            }
            onMoveNextRequest={() =>
              this.setState( {
                photoIndex: (photoIndex + 1) % imageNodes.length,
              } )
            }
          />
        )}
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
    isWideScreen: state.isWideScreen,
    category: state.categoryPhotoFilter
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setPhotosOpen,
  setCategoryFilter,
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
            resolutions(width: 300) {
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
                caption
                rating
                date
                hash
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
