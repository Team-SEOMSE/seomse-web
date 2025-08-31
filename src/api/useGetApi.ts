import { useQuery } from "@tanstack/react-query";
import { API_URL } from "./URL";
import { getCookie } from "../hooks/useCookie";

const useGetApi = (
  key: string,
  url: string,
  requireAuth: boolean = true,
  queryOptions?: object
) => {
  const COMPOUND_URL = `${API_URL}${url}`;

  const token = getCookie("accessToken");

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  };

  const getDatas = async () => {
    try {
      const res = await fetch(COMPOUND_URL, options);
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }
      return await res.json();
    } catch (error) {
      console.error("[useGetApi] fetch error:", error);
    }
  };

  const { refetch, data, isLoading, isError, error } = useQuery({
    queryKey: [key, url],
    queryFn: getDatas,
    ...queryOptions,
  });

  return { data, isLoading, isError, error, refetch };
};

export default useGetApi;
