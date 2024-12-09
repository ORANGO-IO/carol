import React, { useState } from "react";

export default (props) => {
  const [display, setDisplay] = useState("none");

  const setState = () => {
    if (display == "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  return (
    <section className="sinais-box">
      <header onClick={setState}>{props.header}</header>
      <main style={{ display }}>{props.children}</main>
    </section>
  );
};
