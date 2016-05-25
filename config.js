var config = {
  production: {
    baseUrl: process.env.BASE_URL || '', // '' for relative links
    site: {
      show_social_icons: true,
      url: process.env.SITE_URL || 'http://example.com', // full site url
      title: 'Matt Foxx Dev',
      comments: true,
      disqus: process.env.DISQUS || 'example',
      googleAnalytics: process.env.GOOGLE_ANALYTICS || '123457'
    }
  },
  development: {
    baseUrl: process.env.DEV_BASE_URL || '', // '' for relative links
    site: {
      show_social_icons: true,
      url: process.env.DEV_SITE_URL || 'http://localhost:7000', // full site url
      title: 'Matt Foxx',
      comments: true,
      disqus: process.env.DEV_DISQUS || 'staging-example',
      googleAnalytics: process.env.DEV_GOOGLE_ANALYTICS || '123456'
    }
  },
  social: {
    github_username: 'FoxxMD',
    stackoverflow_id: '1469797',
    twitter_username: '',
    google_plus_id: '',
    email: '',
    linkedin_username: '',
    angellist_username: '',
    bitcoin_url: '',
    paypal_url: '',
    flattr_button: ''
  }
};

module.exports = config;
