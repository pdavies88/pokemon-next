import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

const SetEra = () => {
  const router = useRouter();
  const { setEra } = router.query;

  const eraSwitch = (era) => {
    switch (era) {
      case "diamond-pearl":
        return "Diamond & Pearl";
      case "heartgold-soulsilver":
        return "HeartGold & SoulSilver";
      case "black-white":
        return "Black & White";
      case "sun-moon":
        return "Sun & Moon";
      case "sword-shield":
        return "Sword & Shield";
      default:
        return era;
    }
  };

  const PokemonGroup = gql`
    query PokemonSet {
      set(q: "series:\\\"${eraSwitch(
        setEra
      )}\\\"") @rest(type: "Set", path: "sets?{args}") {
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
            <div>
              <img src={set.images.logo} />
            </div>
            <div>
              <img src={set.images.symbol} />
            </div>
          </div>
        ))}
    </>
  );
};
export default SetEra;
