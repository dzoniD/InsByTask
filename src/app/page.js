import ProductList from "@/components/ProductList/ProductList";
import { getToken } from "@/components/utils/fetchHelper";
import Link from "next/link";

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
