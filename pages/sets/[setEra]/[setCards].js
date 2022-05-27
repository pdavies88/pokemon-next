import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import CardSingle from "../../../components/CardSingle";

const SetCards = () => {
  const router = useRouter();
  const { setCards } = router.query;
  const [routerPending, setRouterPending] = useState(true);
  const [cardsQuery, setCardsQuery] = useState();

  // Escaping the Escape because it needs to use double quotes inside double quotes for multiple word queries
  // Example: Vivid Voltage
  // q: "set.name:\\"vivid voltage\\""
  const PokemonGroup = gql`
    query PokemonSingle {
      setCard(q: "set.name:\\"${cardsQuery}\\"")
        @rest(type: "SetCard", path: "cards?{args}") {
        data
      }
    }
  `;

  useEffect(() => {
    if (setCards) {
      setCardsQuery(setCards.split("-").join(" "));
      setRouterPending(false);
    }
  }, [setCards]);

  const { data } = useQuery(PokemonGroup, {
    skip: routerPending,
  });

  return (
    <div className="flex-grid">
      {data
        ? data.setCard.data.map((card, i) => (
            <div key={i} className="column quarters">
              <CardSingle card={card} />
            </div>
          ))
        : null}
    </div>
  );
};
export default SetCards;
