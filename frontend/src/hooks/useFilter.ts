import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (limitDocsPerPage: number = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetSearchKey, setResetSearchKey] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const filter = {
    limit: limitDocsPerPage,
    page: Number(searchParams.get("page")) || 1,
    ...Object.fromEntries(searchParams),
  };
  const handleResetAll = () => {
    setSearchParams({});
    setResetSearchKey(Date.now());
    setEnabled(false);
  };
  const handleEnableFilter = () => setEnabled(true);
  return {
    filter,
    resetSearchKey,
    handleResetAll,
    handleEnableFilter,
    enabled,
  };
};
