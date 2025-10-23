import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { CrUxHistoryJson } from "./CruxHistoryTypes";

export default function useCrUxHistoryJson(folderPath: string): {
  data: CrUxHistoryJson | null;
  isLoading: boolean;
  refetch: () => void;
} {
  const [data, setData] = useState<CrUxHistoryJson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJsonFiles(folderPath, setData, setIsLoading);
  }, [folderPath, setData, setIsLoading]);

  const refetch = (): void => {
    // localStorage.removeItem(`json-data-${folderPath}`);
    fetchJsonFiles(folderPath, setData, setIsLoading);
  };

  return { data, isLoading, refetch };
}

async function fetchJsonFiles(
  folderPath: string,
  setData: Dispatch<SetStateAction<CrUxHistoryJson | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
): Promise<void> {
  try {
    const response = await fetch(`/${folderPath}`);
    const jsonData = await response.json();
    setData(jsonData);
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  } finally {
    setIsLoading(false);
  }
}
