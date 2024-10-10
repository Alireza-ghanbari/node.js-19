import React from "react";

export default function ProductCard({
  img,
  name,
  price,
  quantity,
  description,
  id,
}) {
  return (
    <div className="w-1/4 flex flex-col rounded-lg overflow-hidden shadow-lg border border-stone-100 h-[360px]">
      <img
        src={`http://localhost:5000/${img[0]}`}
        alt={name}
        className="w-full h-1/2 object-cover "
      />
      <div className="mt-2 px-2 flex flex-col justify-between h-full ">
        <div className="">
          <h2 className="font-semibold text-xl">{name}</h2>
          <p className="text-sm font-light line-clamp-3">{description}</p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-xl ">${price}</p>
          <button className="bg-blue-600/70 px-5 py-1 rounded-lg text-white hover:bg-blue-600 duration-200">Buy</button>
        </div>
      </div>
    </div>
  );
}
