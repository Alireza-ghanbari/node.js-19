import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (!data.success) {
          toast.error(data.message);
        }
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-3 py-10">
        {product &&
          product?.map((e, index) => (
            <ProductCard
              key={index}
              img={e.images}
              name={e.name}
              price={e.price}
              quantity={e.quantity}
              description={e.description}
              id={e._id}
            />
          ))}
      </div>
    </div>
  );
}
