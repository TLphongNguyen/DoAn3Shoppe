// importImages.js
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  };
  
  const images = importAll(
    require.context('./sliner', false, /\.(png|jpe?g|svg)$/)
  );
  const offers = importAll(
    require.context('./offers', false, /\.(png|jpe?g|svg)$/)
  );
  const categories = importAll(
    require.context('./category', false, /\.(png|jpe?g|svg)$/)
  )
  const flashSale = importAll(
    require.context('./sale', false, /\.(png|jpe?g|svg)$/)
  )
  const products = importAll(
    require.context('./products', false, /\.(png|jpe?g|svg)$/)
  )
  const footers = importAll(
    require.context('./footer', false, /\.(png|jpe?g|svg)$/)
  )
  
  export {images,offers,categories,flashSale,products,footers} ;
  