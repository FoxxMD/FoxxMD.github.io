const webpack = require("webpack");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { store } = require(`./node_modules/gatsby/dist/redux`);
const fastExif = require('fast-exif');
const get = require('lodash/get');

// XP values are encoded as byte arrays
// https://stackoverflow.com/a/46681758/1469797
function parseByteArray(arr) {
 return String.fromCharCode.apply(null, arr);
}

// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
function hashCode(s) {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
    });
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });
  } else if(node.internal.type === 'ImageSharp' && node.id.includes('content/pictures/')) {
      const absolutePath = node.id.split(' ')[0];
      fastExif.read(absolutePath)
        .then((exifData) => {
          const title        = get( exifData, [ 'image', 'ImageDescription' ], null );
          const locationData = get( exifData, [ 'image', 'XPSubject' ], null );
          const location     = (locationData === null ? null : parseByteArray( locationData ));
          const categoryData = get( exifData, [ 'image', 'XPKeywords' ], null );
          const categories   = (categoryData === null ? [ 'uncategorized' ] : parseByteArray( categoryData ).split( ';' ));
          const iso          = get( exifData, [ 'exif', 'ISO' ], null );
          const model        = get( exifData, [ 'exif', 'LensModel' ], null );
          const fstop        = get( exifData, [ 'exif', 'FNumber' ], null );
          const focalLength  = get( exifData, [ 'exif', 'FocalLength' ], null );
          const dateData     = get( exifData, [ 'exif', 'DateTimeOriginal' ], null );
          const date         = dateData !== null ? dateData.toISOString() : null;
          const captionData  = get( exifData, [ 'image', 'XPComment' ], null );
          const caption      = (captionData === null ? '' : parseByteArray( captionData ));
          const rating       = get( exifData, [ 'image', 'Rating' ], 0 );
          const hash         = hashCode( node.id );

              createNodeField({
                node,
                name: 'exif',
                value: {title, location, categories, caption, rating, date, hash, technical: {iso, model, fstop, focalLength}}
              });
        })
        .catch((err) => console.error(err));
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve("./src/templates/PostTemplate.js");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: { id: { regex: "//posts|pages//" } }, limit: 1000) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create posts and pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          const slug = edge.node.fields.slug;
          const isPost = /posts/.test(edge.node.id);

          createPage({
            path: slug,
            component: isPost ? postTemplate : pageTemplate,
            context: {
              slug: slug
            }
          });
        });
      })
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case "build-javascript":
      {
        let components = store.getState().pages.map(page => page.componentChunkName);
        components = _.uniq(components);
        config.plugin("CommonsChunkPlugin", webpack.optimize.CommonsChunkPlugin, [
          {
            name: `commons`,
            chunks: [`app`, ...components],
            minChunks: (module, count) => {
              const vendorModuleList = []; // [`material-ui`, `lodash`];
              const isFramework = _.some(
                vendorModuleList.map(vendor => {
                  const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
                  return regex.test(module.resource);
                })
              );
              return isFramework || count > 1;
            }
          }
        ]);
        // config.plugin("BundleAnalyzerPlugin", BundleAnalyzerPlugin, [
        //   {
        //     analyzerMode: "static",
        //     reportFilename: "./report/treemap.html",
        //     openAnalyzer: true,
        //     logLevel: "error",
        //     defaultSizes: "gzip"
        //   }
        // ]);
      }
      break;
  }
  return config;
};

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([`syntax-dynamic-import`, `dynamic-import-webpack`])
  };
};
