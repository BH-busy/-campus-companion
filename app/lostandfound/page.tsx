import lostItems from "@/data/lost-items.json";

type Item = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  status: "lost" | "found";
  contactEmail: string;
};

type PageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

export default async function LostFoundPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedStatus =
    params?.status === "lost" || params?.status === "found"
      ? params.status
      : "all";

  const items = (lostItems as Item[]).filter((item) =>
    selectedStatus === "all" ? true : item.status === selectedStatus
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Lost & Found</h1>
        <p className="mt-2 text-slate-600">
          Browse recently reported lost and found items around campus.
        </p>
      </header>

      <section
        aria-labelledby="filter-heading"
        className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <h2 id="filter-heading" className="mb-3 text-lg font-semibold">
          Filter by Status
        </h2>

        <nav aria-label="Lost and found filters" className="flex flex-wrap gap-3">
          <a
            href="/lost-found"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selectedStatus === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </a>

          <a
            href="/lost-found?status=lost"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selectedStatus === "lost"
                ? "bg-rose-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Lost
          </a>

          <a
            href="/lost-found?status=found"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selectedStatus === "found"
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Found
          </a>
        </nav>
      </section>

      <section aria-labelledby="items-heading">
        <h2 id="items-heading" className="sr-only">
          Lost and found items
        </h2>

        {items.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            No items match this filter.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.name}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                      item.status === "lost"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="mb-4 text-sm text-slate-600">
                  {item.description}
                </p>

                <dl className="space-y-2 text-sm text-slate-700">
                  <div>
                    <dt className="font-medium inline">Location: </dt>
                    <dd className="inline">{item.location}</dd>
                  </div>

                  <div>
                    <dt className="font-medium inline">Date: </dt>
                    <dd className="inline">{item.date}</dd>
                  </div>

                  <div>
                    <dt className="font-medium inline">Contact: </dt>
                    <dd className="inline">
                      <a
                        href={`mailto:${item.contactEmail}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {item.contactEmail}
                      </a>
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}