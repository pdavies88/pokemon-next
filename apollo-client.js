import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://api.pokemontcg.io/v2/",
  headers: {
    "X-Api-Key": process.env.API_KEY,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

export default client;
