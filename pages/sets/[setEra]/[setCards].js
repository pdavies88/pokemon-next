import { gql } from "@apollo/client";
import CardSingle from "../../../components/CardSingle";
import client from "../../../apollo-client";

export async function getServerSideProps(context) {
  const { setCards } = context.params;
  const setCardsFormatted = setCards.split("-").join(" ");

  const { data } = await client.query({
    query: gql`
      query PokemonSingle {
        setCard(q: "set.name:\\"${setCardsFormatted}\\"")
          @rest(type: "SetCard", path: "cards?{args}") {
          data
        }
      }
    `,
  });

  return {
    props: {
      setCard: data.setCard,
    },
  };
}

const SetCards = ({ setCard }) => {
  return (
    <div className="flex-grid">
      {setCard
        ? setCard.data.map((card, i) => (
            <div key={i} className="column quarters">
              <CardSingle card={card} />
            </div>
          ))
        : null}
    </div>
  );
};
export default SetCards;
