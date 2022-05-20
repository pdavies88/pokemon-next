import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import ImageSize from "../../utils/image";

const SetEra = () => {
  const router = useRouter();
  const { setEra } = router.query;

  const eraSwitch = (era) => {
    switch (era) {
      case "diamond-pearl":
        return "diamond";
      case "heartgold-soulsilver":
        return "heartgold";
      case "black-white":
        return "black";
      case "sun-moon":
        return "sun";
      case "sword-shield":
        return "sword";
      default:
        return era;
    }
  };

  const PokemonGroup = gql`
    query PokemonSet {
      set(q: "series:${eraSwitch(
        setEra
      )}") @rest(type: "Set", path: "sets?{args}") {
        data
      }
    }
  `;

  const { data } = useQuery(PokemonGroup);

  const activeSet = data?.set.data;

  return (
    <>
      {activeSet &&
        activeSet.map((set, i) => (
          <div key={i}>
            <div>
              {set.name} - {set.total} - {set.releaseDate}
            </div>
            <ImageSize src={set.images.logo} />
            <ImageSize src={set.images.symbol} />
          </div>
        ))}
    </>
  );
};
export default SetEra;
