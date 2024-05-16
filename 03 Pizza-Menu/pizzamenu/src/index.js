import React from "react";
import ReactDOM from "react-dom/client";

//importing css file

import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return (
    //! one Way of Adding Style
    // <h1 style={{ color: "red", fontSize: "48px", textTransform: "uppercase" }}>
    //   Fast React Pizza Co.
    // </h1>

    //! another way of doing styling
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizza = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {/* <div>
        {pizzaData.map((pizza) => (
          <Pizza
            photoName={pizza.photoName}
            name={pizza.name}
            price={pizza.price}
          />
        ))}
      </div> */}
      {/* in above function the method of passing props is not a good practice
      instead we should pass it through pass the whole object */}

      {numPizza > 0 && (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizzaObj={pizza} />
          ))}
        </ul>
      )}

      {/* if we use numPizza only for short-circuiting technique which is ofcourse 0 here. if there is no pizza in the array i.e. the length of pizza is 0 then is happily render 0. But react does'nt render true in case of boolean value. So alwqays try to use boolean values for short-circuiting */}

      {/* using ternary operator 
        condition ? JSX when condition true : JSX when condition is false 
      */}

      {/* //!here we can't use forEach method because it does'nt work here as in ul we must have some 
        //! which only be possible if we use map() method because forEach method does'nt return anything */}

      {/* <Pizza
        name="pizza Spinaci"
        ingredients="Tomato, mozarella, and pepperoni"
        photoName="./pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        // price="12" // where 12 is string
        // to enter a number
        price={12}
        photoName="./pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  //function name needs to starts with Capital
  // function needs to return markup JSX

  console.log(pizzaObj);

  // if (pizzaObj.soldOut) return null;

  return (
    // hardcode data
    // <div>
    //   <img src="./pizzas/spinaci.jpg\" alt="pizza img" />
    //   <h3>Pizza Salamino</h3>
    //   <p>Tomato, mozarella, and pepperoni</p>
    // </div>

    // passing data from props
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price + 3}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  // console.log(hour);
  const openHour = 8;
  const closeHour = 13;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // if (hour >= openHour && hour <= closeHour) alert("We're currently open");
  // else alert("sorry we are close");

  // return (
  //   <footer className="footer">
  //     {new Date().toLocaleTimeString()} We're currently open!
  //   </footer>
  // );

  // conditional rendering using short-cicuit technique
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online.</p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );

  // return React.createElement("footer", null, "We're currently open !");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// what is JSX
