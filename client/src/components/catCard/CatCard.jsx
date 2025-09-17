// src/components/catCard/CatCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  // Convert the title to a URL-friendly format (e.g., "AI Artists" to "ai artists")
  const categoryTitle = card.title.toLowerCase().replace(/\s/g, '-');

  return (
    <Link to={`/gigs?cat=${categoryTitle}`}>
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}

export default CatCard;