"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

interface SearchQueryProviderProps {
  onQueryChange: (query: string) => void;
}

const SearchQueryProvider: React.FC<SearchQueryProviderProps> = ({
  onQueryChange,
}) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  React.useEffect(() => {
    onQueryChange(q);
  }, [q, onQueryChange]);

  return null;
};

export default SearchQueryProvider;
