const products = [
    { name: 'Lloyd Jean', price: '$149.00', image: '/path/to/image1.jpg' },
    { name: 'Mantis Pant', price: '$160.00', image: '/path/to/image2.jpg' },
    { name: 'Bob Shorts', price: '$75.00', image: '/path/to/image3.jpg' },
    { name: 'Barry Jacket', price: '$65.00', originalPrice: '$100.00', image: '/path/to/image4.jpg', sale: true },
  ];
  
  const ProductGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <div key={index} className="text-center">
          <img src={product.image} alt={product.name} className="w-full" />
          <p>{product.name}</p>
          <p>{product.sale ? <span className="line-through">{product.originalPrice}</span> : null} {product.price}</p>
        </div>
      ))}
    </div>
  );
  
  export default ProductGrid;
  