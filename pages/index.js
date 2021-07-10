// import Head from 'next/head'
// import Image from 'next/image'
import Link from "next/link";
// import { useQuery, gql } from "@apollo/client";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the World of Pokemon</h1>
      <Link href="/sets">
        <a>Sets</a>
      </Link>
      <Link href="/cards">
        <a>Cards</a>
      </Link>
    </div>
  );
}
