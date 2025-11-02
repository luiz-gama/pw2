import ProductCard from "./productCard";



function ProductList() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <ProductCard name="Computador DELL" />
      <ProductCard name="Smartphone XYZ" />
      <ProductCard name="Tablet ABC" />
      <ProductCard name="Monitor 4K" />
      <ProductCard name="Teclado Mecânico" />
      <ProductCard name="Mouse Gamer" />
      <ProductCard name="Impressora Multifuncional" />
      <ProductCard name="Roteador Wi-Fi 6" />
    </div>
  );
}

export default ProductList;
