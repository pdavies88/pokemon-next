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
    <div className="flex-grid">
      {activeSet &&
        activeSet.map((set, i) => (
          <div key={i} className="column halves">
            <div className="container">
              <div>
                {set.name} - {set.total} - {set.releaseDate}
              </div>
              <ImageSize src={set.images.logo} imageSize="small" />
              <ImageSize src={set.images.symbol} imageSize="icon" />
            </div>
          </div>
        ))}
    </div>
  );
};
export default SetEra;
