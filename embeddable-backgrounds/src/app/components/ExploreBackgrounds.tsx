"use client";

import { useMemo, useState } from "react";
import type { Background } from "@/app/data/backgrounds";
import BackgroundCard from "@/app/components/BackgroundCard";

type ExploreBackgroundsProps = {
  backgrounds: Background[];
};

type SortOption = "newest" | "name";

export default function ExploreBackgrounds({
  backgrounds,
}: ExploreBackgroundsProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [access, setAccess] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const categories = useMemo(() => {
    return ["all", ...new Set(backgrounds.map((item) => item.category))];
  }, [backgrounds]);

  const filteredBackgrounds = useMemo(() => {
    let result = [...backgrounds];

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();

      result = result.filter((background) => {
        return (
          background.title.toLowerCase().includes(lowerSearch) ||
          background.description.toLowerCase().includes(lowerSearch) ||
          background.category.toLowerCase().includes(lowerSearch) ||
          background.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
        );
      });
    }

    if (category !== "all") {
      result = result.filter((background) => background.category === category);
    }

    if (access !== "all") {
      result = result.filter((background) => background.access === access);
    }

    if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [backgrounds, search, category, access, sort]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Search
            </label>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search aurora, grid, stars..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All categories" : item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Access
            </label>

            <select
              value={access}
              onChange={(event) => setAccess(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
            >
              <option value="all">All</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Sort
            </label>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
            >
              <option value="newest">Newest</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredBackgrounds.length}
          </span>{" "}
          backgrounds
        </p>

        {(search || category !== "all" || access !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setAccess("all");
              setSort("newest");
            }}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredBackgrounds.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBackgrounds.map((background) => (
            <BackgroundCard key={background.id} background={background} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            No backgrounds found
          </h2>

          <p className="mt-3 text-slate-400">
            Try searching for another keyword or clear your filters.
          </p>
        </div>
      )}
    </section>
  );
}