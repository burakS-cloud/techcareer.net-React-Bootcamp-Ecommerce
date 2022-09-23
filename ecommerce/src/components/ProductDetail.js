import React, { useState, useContext, useEffect, useRef } from "react";
import { baseService } from "../network/services/baseService";
import { useParams, useNavigate } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import Colors from "./Colors";
import DetailsThumb from "./DetailsThumb";
import ProductDetailsStyles from "../assets/css/ProductDetails.css";

const ProductDetail = () => {
  let navigate = useNavigate();

  const [productsDetail, setProductsDetail] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  let myRef = useRef(null);

  let handleTab = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[selectedIndex].className = "active";
  };

  // useEffect(() => {
  //   myRef.current.children[selectedIndex].className = "active";
  // });

  const getProducts = async () => {
    try {
      const data = await baseService.get(`/products/${ID}`);
      setProductsDetail(data);
    } catch (error) {
      console.log("Get products error", error);
    }
  };

  const addToCart = (product) => {
    let cartProduct = cart.find((q) => q.id === product.id);

    console.log(cartProduct);

    if (cartProduct) {
      cartProduct.quantity += 1;

      setCart([...cart]);
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.unitPrice,
        quantity: 1,
      };

      setCart((prev) => [...prev, cartProduct]);
    }
  };

  let { id } = useParams();
  let ID = parseInt(id);

  console.log("productsDetail:", productsDetail);

  const item = [
    {
      src: [
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
        "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
      ],
      colors: ["red", "black", "crimson", "teal"],
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
    },
  ];

  return (
    <div className="app">
      <div className="product__details">
        <div className="big__img">
          <img src={item[0]?.src[selectedIndex]} alt="" />
        </div>

        <div className="product__box">
          <div className="product__row">
            <h2>{productsDetail.name}</h2>
            <span>${productsDetail.unitPrice}</span>
          </div>
          <Colors colors={item[0].colors} />

          <p>{item[0].description}</p>
          <p>{item[0].content}</p>

          <DetailsThumb images={item[0].src} tab={handleTab} />
          <button
            className="product__cart"
            onClick={() => addToCart(productsDetail)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
