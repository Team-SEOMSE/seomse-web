import { useMutation } from "@tanstack/react-query";
import { getCookie } from "../hooks/useCookie";
import { API_URL } from "./URL";

const usePostApi = (key: string, url: string) => {
  const COMPOUND_URL = `${API_URL}${url}`;
  const token = getCookie("accessToken");

  const postData = async (body: Record<string, unknown>) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(COMPOUND_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.message);
    }

    return await res.json();
  };

  const { mutate, data, error, isError, isPending } = useMutation({
    mutationKey: [key],
    mutationFn: postData,
    onSuccess: () => {
      console.log(`요청 성공`);
    },
    onError: (error) => {
      console.log(`요청 실패: ${error}`);
    },
  });

  return { data, isPending, error, isError, mutate };
};

export default usePostApi;
