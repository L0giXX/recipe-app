"use client";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debounced] = useDebounce(search, 500);

  useEffect(() => {
    if (!debounced) router.push("/saved-recipes");
    else router.push(`/saved-recipes?search=${debounced}`);
  }, [debounced, router]);

  return (
    <div className="flex justify-center mb-2">
      <input
        type="text"
        placeholder="Search for Recipe"
        className="rounded border px-3 py-2 text-gray-900"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
