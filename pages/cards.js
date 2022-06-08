import { gql } from "@apollo/client";
import { useState } from "react";
import CardSingle from "../components/CardSingle";
import client from "../apollo-client";

export async function getServerSideProps(context) {
  const { q } = context.query;
  // Escaping the Escape because it needs to use double quotes inside double quotes for multiple word queries
  const { data } = await client.query({
    query: gql`
      query PokemonSingle {
        card(q: "name:\\"${q}\\"")
          @rest(type: "Card", path: "cards?{args}") {
          data
        }
      }
    `,
  });

  return {
    props: {
      card: data.card,
    },
  };
}

const Cards = ({ card }) => {
  const [cardQuery, setCardQuery] = useState("");

  const handleChange = (e) => {
    setCardQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", cardQuery);
    window.location.search = searchParams.toString();
  };

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
        {card
          ? card.data.map((card, i) => (
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
