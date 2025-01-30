import React, { useState, useEffect } from "react";

const Card = () => {
  const [data, setData] = useState([]);

  let BASE_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []); // bo'sh dependency array, ya'ni faqat bir marta bajariladi

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
        >
          <img
            className="w-full h-[350px] object-cover"
            src={value.image}
            alt={value.title}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {value.title}
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">{`$${value.price}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
