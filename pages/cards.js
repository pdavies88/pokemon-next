// import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import CardSingle from "../components/CardSingle";

const Cards = () => {
  const [cardQuery, setCardQuery] = useState("");
  const [cardValue, setCardValue] = useState("");
  const [valuePending, setValuePending] = useState(true);

  const handleChange = (e) => {
    e.target.value;
    setCardQuery(e.target.value);
    setValuePending(true);
  };

  const handleSubmit = (e) => {
    setCardValue(cardQuery);
    setValuePending(false);
    e.preventDefault();
  };

  // Escaping the Escape because it needs to use double quotes inside double quotes for multiple word queries
  const PokemonGroup = gql`
    query PokemonSingle {
      card(q: "name:\\"${cardValue}\\"")
        @rest(type: "Card", path: "cards?{args}") {
        data
      }
    }
  `;

  const { data } = useQuery(PokemonGroup, {
    skip: valuePending,
  });

  return (
    <div>
      <h1>Search for a Card</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Card:
          <input type="text" value={cardQuery} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="flex-grid">
        {data
          ? data.card.data.map((card, i) => (
              <div key={i} className="column quarters">
                <CardSingle card={card} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Cards;
