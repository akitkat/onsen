const fs = require('fs');
const glob = require('glob')
const sass = require('node-sass');
const config = require('./gatsby-config');
const cheerio = require('cheerio');

const inputDir = 'public/amp';

const cheerioOptions = {
  normalizeWhitespace: false,
  xmlMode: false,
  decodeEntities: false,
  cwd: '',
  round: true,
}

glob("public/amp/**/*.html", {
  ignore: 'public/amp/offline-plugin-app-shell-fallback/index.html'
}, (e, files) => {
  for(const file of files) {
    try {
      const urlPath = file.replace(inputDir, ''); // No inputDir in the URL
      
      fs.writeFileSync(file, (() => {
        const html = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(html, cheerioOptions);

        $('script').each(function() {
          // Dont remove structured data though
          if($(this).attr('type') !== 'application/ld+json'){
            $(this).remove();
          }
        });

        $('head')
          .append('<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>')
          .append('<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>')
          .append('<script async src="https://cdn.ampproject.org/v0.js"></script>')
          .find('link[rel="amphtml"], link[rel="canonical"], link[as="script"]')
          .remove();

        $('noscript').remove();
        $('html').attr('amp', '');

        if ($('head meta[content="width=device-width,minimum-scale=1,initial-scale=1"]').length === 0) {
          $('head meta[name="viewport"]').remove();
          $('head').prepend('<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">');
        }

        $('link[rel=stylesheet]').each(() => $(this).remove());
        $('*').removeAttr('style');

        $('img, video, iframe').each(function() {
          this.name = 'amp-' + this.name;
        });

        $('.main-pane amp-img, .page amp-img').each(function(){
          if($(this).attr('data-layout')) {
            $(this).attr('layout', $(this).attr('data-layout'));
          } else {
            if($(this).attr('width') > 700 ) {
              $(this).attr('layout', 'responsive');
            } else {
              $(this).attr('layout', 'fixed');
            }
          }
        });
        
        // カスタム
        $('amp-iframe').attr('sandbox','allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
        $('amp-iframe').attr('layout','responsive');
        $('amp-video').attr('layout', 'responsive');
        $('amp-video').attr('height', '270');
        $('amp-video').attr('width', '480');

        // Google Analytics
        $('head').append('<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>');
        $('amp-analytics').remove();
        
        $('body').prepend(`<amp-analytics type="googleanalytics" id="analytics1">\
          <script type="application/json">{"vars": {"account": ${process.env.GA_TRACKING_ID}},"triggers": {"trackPageview": {"on": "visible","request": "pageview"}}}</script>\
          </amp-analytics>`);

        $('amp-img').attr('layout', 'responsive');
        $('amp-img').attr('width', '450');
        $('amp-img').attr('height', '270');
        $('amp-img').removeAttr('loading');
        
        $('meta').removeAttr('httpequiv');
        $('section').removeAttr('height');
        $('head').append(`<link rel="canonical" href="${config.siteMetadata.siteUrl}/${urlPath.split`/`[1]}">`)

        const pictures = $('picture');
        if (pictures.length > 0) {
          pictures.children('source').remove();
          pictures.each((_, element) => {
            const ampImg = $(element).html().trim();
            $(element).replaceWith(ampImg);
          });
        }

        const webpackStats = JSON.parse(
          fs.readFileSync('public/webpack.stats.json')
        );
        
        const files = webpackStats.namedChunkGroups['component---src-templates-page-js'].assets
          .filter(f => f.name.includes('.css'));
        let css = files.map((file) => sass.renderSync({
          file: `public/${file.name}`,
          outputStyle: 'compressed'
        }).css.toString()).join('');
        
        $('style').each((i, e) => {
          css += $(e).html().replace(/!important;/g, '')
        })

        $('style').remove();
        $('head').prepend(`<style amp-custom>${css}</style>`);
        $('head').prepend('<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>');
        return $.html();
      })());
    } catch (e) {
      console.log(file)
      console.error(e)
    }
  }
  console.log('The site is now AMP ready');
});
