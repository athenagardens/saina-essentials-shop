import Image from "next/image";
import Link from "next/link";

const ASSETS =
  "https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets";

const featuredProducts = [
  {
    name: "Infused Hibiscus",
    description: "Best Seller",
    price: "from P 120",
    image: `${ASSETS}/hibiscus_loose.png`,
    alt: "Infused Hibiscus",
  },
  {
    name: "Menopause suppoty Granola bars",
    description: "Hormone support",
    price: "from P 50",
    image: `${ASSETS}/menopause_granola.png`,
    alt: "Menopause Granola",
  },
  {
    name: "Coconut Cookies",
    description: "Sugar & Gluten free",
    price: "from P 80",
    image: `${ASSETS}/coconut_cookies.png`,
    alt: "Coconut Cookies",
  },
  {
    name: "Lemon Cinnamon Honey",
    description: "Immunity & warmth",
    price: "from P 80",
    image: `${ASSETS}/honey_lemon_cinnamon.png`,
    alt: "Lemon Cinnamon Honey",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] text-[#2A2A2A]">
      <header className="sticky top-0 z-50 border-b border-[#EDE6DC] bg-[#F3EEE6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src={`${ASSETS}/saina_logo.png`}
              alt="Saina Essentials"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-contain"
            />
            <div>
              <h1 className="font-serif text-lg font-semibold text-[#2F3E2F]">
                Saina Essentials
              </h1>
              <p className="text-xs text-[#5C6B4E]">
                Athena Gardens, Notwane
              </p>
            </div>
          </div>

          <Link
            href="/cart"
            className="rounded-lg bg-[#2F3E2F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5C6B4E]"
          >
            View Cart
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 text-center md:py-14">
        <div className="mb-5 flex justify-center">
          <Image
            src={`${ASSETS}/saina_logo.png`}
            alt="Saina Essentials"
            width={80}
            height={80}
            className="h-20 w-20 object-contain"
            priority
          />
        </div>

        <h2 className="mb-3 font-serif text-3xl text-[#2F3E2F] md:text-5xl">
          Saina Essentials
        </h2>

        <p className="mb-6 font-serif text-lg text-[#5C6B4E] md:text-xl">
          Clean. Healing. Naturally Nourishing.
        </p>

        <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-[#2A2A2A]">
          Keto-friendly • Diabetic-conscious • Hormone supportive •
          Sugar-free & Gluten-free options. From our best-selling infused
          hibiscus and menopause seed granola to pure teas, flours,
          natural oils and essential oil blends.
        </p>

        <Link
          href="/shop"
          className="inline-block rounded-lg bg-[#2F3E2F] px-8 py-3 font-medium text-white transition hover:bg-[#5C6B4E]"
        >
          Browse Products
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <h3 className="mb-8 text-center font-serif text-2xl text-[#2F3E2F]">
          Featured Products
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.name}
              className="flex h-full flex-col rounded-2xl border border-[#EDE6DC] bg-white p-5 shadow-sm"
            >
              <div className="relative mb-4 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-[#EDE6DC]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-3"
                />
              </div>

              <h4 className="font-serif text-lg text-[#2F3E2F]">
                {product.name}
              </h4>

              <p className="mb-2 text-sm text-gray-600">
                {product.description}
              </p>

              <p className="mt-auto pt-2 font-serif text-xl text-[#A65D3F]">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#EDE6DC] bg-[#F3EEE6] px-4 py-8 text-center text-sm text-[#5C6B4E]">
        <p>Saina Essentials · Athena Gardens, Notwane, Gaborone</p>
        <p className="mt-1">
          Orange Money / MyZaka · Absa Bank Transfer
        </p>
      </footer>
    </main>
  );
}
