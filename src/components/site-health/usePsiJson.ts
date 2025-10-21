import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { PsiReportCollection } from "./siteHealthTypes";

export default function usePsiJson(folderPath: string): {
  data: PsiReportCollection | null;
  isLoading: boolean;
  refetch: () => void;
} {
  const [data, setData] = useState<PsiReportCollection | null>(null);
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
  setData: Dispatch<SetStateAction<PsiReportCollection | null>>,
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
