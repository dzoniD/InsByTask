import ProductList from "@/components/ProductList/ProductList";
import Link from "next/link";
const { uuid } = require("uuidv4");

async function getToken() {
  const uuids = uuid();

  const response = await fetch(" https://dev-mrp.insby.tech/api/v2/init/app", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `hQtwpolwKTjUkNAkZGeSiOkhp2OP8UA6TAPyA7bOWLFXTPPJOMzQUOOhLg43uXoFIuA5T4yKySJnHZhhVNWBqfNLcaKBfrAx:lolci3wdjsHDhFsQOnubYma5Zl33BPwE4NA5wftU9qxJnmIkP3ju8qw0F6ECjF4kvmp3SwNuLZrEMQezkFHqOMYjCBVJJzxv`,
          "utf8"
        ).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid: `${uuids}`, uuidOS: "Windows" }),
  });

  const data = await response.json();
  return data.data.token;
}

export default async function Home() {
  const token = await getToken();

  return (
    <>
      <header className="py-4 h-16 relative bg-white border-b-gray-400 shadow">
        <Link
          href={"/user-page"}
          className="h-8 w-8 rounded-full cursor-pointer border absolute right-3 font-normal text-custom-red text-3xl"
        >
          <span className="absolute right-[5px] top-[-2px]">M</span>
        </Link>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <ProductList token={token} />
      </main>
    </>
  );
}
