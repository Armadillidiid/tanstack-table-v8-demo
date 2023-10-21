import { useState, useEffect } from "react";
import { Jobs } from "./types";
import { generateJobItems } from "../utils/generateRandomJobItem";

type Query<T> =
  | {
      data: T;
      isPending: false;
      isError: false;
    }
  | {
      data?: T;
      isPending: true;
      isError: false;
    }
  | {
      data?: undefined;
      isPending: false;
      isError: true;
    };

const useJobs = () => {
  const [query, setQuery] = useState<Query<Jobs>>({
    data: undefined,
    isPending: true,
    isError: false,
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = {
          results: generateJobItems(15),
        };
        if (!ignore) {
          setQuery({ data, isPending: false, isError: false });
        }
      } catch (error) {
        if (!ignore) {
          setQuery({ data: undefined, isPending: false, isError: true });
        }
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return query;
};

export default useJobs;
