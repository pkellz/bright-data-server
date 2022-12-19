# 👀 Overview

This is the backend for the eCommerce [web scraper project](https://www.youtube.com/watch?v=WyYcSFy3uh8).

The repo for the front-end [can be found here](https://github.com/pkellz/bright-data).

# ▶ Getting Started

1) Clone this repository
2) Install [nodemon](https://www.npmjs.com/package/nodemon) if you don't already have it: `npm install -g nodemon`
3) `cd` into the 'server' folder
4) Run `npm install`
5) ‼ **IMPORTANT** ‼ You need to create a `.env` file inside of the `server` folder. Make a copy of the provided `env.sample` file and rename it to `.env`.
Most of the configuration is set for you but you do need to provide your own Bright Data API key, collector ID, and MongoDB connection string.
6) After setting up your configuration, start the project by running `nodemon`

# Bright Data

Like in the video, you'll need to create your own Bright Data collector. 
Once you do that, navigate to the collector IDE. (https://brightdata.com/cp/data_collector/collectors/YOUR_COLLECTOR_ID/code)

In the `Interaction Code` editor, paste the following code:
```
// Selecting a country for proxy
country(input.country || 'us');
const runningProducts = [];
const amazonURL = 'https://www.amazon.com/s?s=price-desc-ranks&k='
const ebayURL ='https://www.ebay.com/sch/i.html?_nkw='
const neweggURL = 'https://www.newegg.com/p/pl?d='

// Navigation to the target page
navigate(`${amazonURL}${input.keyword}`);
const { amazonProducts } = parse();

navigate(`${ebayURL}${input.keyword}`);
let { ebayProducts } = parse();
ebayProducts = ebayProducts.slice(1);

navigate(`${neweggURL}${input.keyword}`);
let { neweggProducts } = parse();

collect({ keyword: input.keyword, products: [...amazonProducts, ...ebayProducts, ...neweggProducts]});
```

In the `Parser Code` section, paste the following code:
```
return {
    amazonProducts: $('[data-component-type="s-search-result"]').toArray().map(el=>{
    let $el = $(el);
    let title_el = $(el).find('h2 a.a-text-normal').eq(0);
    let name_el = title_el.find('span').eq(0);
    let image_el = $(el)
    .find('span[data-component-type="s-product-image"] img').eq(0);
    let price_el = $(el).find('.a-price:not([data-a-strike])').eq(0);
    let parse_price = el=>{
      let price = $(el).find('.a-offscreen').eq(0).text();
      return parseFloat(price.replace(/^\D+/, '').replace(/,/g, ''));
    };
    return {
      title: name_el.text().replace('\n', '').trim(),
      url: new URL($el.find('[data-component-type="s-product-image"]').find('a').attr('href'), location.href),
      price: parse_price(price_el),
      image: image_el.attr('src'),
      competitor: 'Amazon'
    };
  }),
  neweggProducts: $('.item-cells-wrap .item-cell').toArray().map(el => {
    let image_el = $(el).find('img').eq(0);
    let name_el = $(el).find('.item-title').eq(0)    
    let price_el = $(el).find('.price-current').eq(0)
    let parse_price = el=>{
      let price = $(el).text();
      return parseFloat(price.replace(/^\D+/, '').replace(/,/g, ''));
    };
    
    return {
      title: name_el.text().replace('\n', '').trim(),
      url: new URL(location.href),
      price: parse_price(price_el),
      image: image_el.attr('src'),
      competitor: 'newegg'
    };
  }),
  ebayProducts: $('.s-item__wrapper').toArray().map(el=>{
    let $el = $(el);
    let image_el = $(el).find('.s-item__image-section img').eq(0);
    let name_el = $(el).find('.s-item__info .s-item__title span').eq(0)    
    let price_el = $(el).find('.s-item__details .s-item__price').eq(0)
    let parse_price = el=>{
      let price = $(el).text();
      return parseFloat(price.replace(/^\D+/, '').replace(/,/g, ''));
    };
    
    return {
      title: name_el.text().replace('\n', '').trim(),
      url: new URL(location.href),
      price: parse_price(price_el),
      image: image_el.attr('src'),
      competitor: 'ebay'
    };
  })
}
```

In the preview pane on the right, click the preview play button to ensure your scraper code is working correctly. 
