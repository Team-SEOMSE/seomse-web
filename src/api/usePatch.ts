import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api/URL";
import { getCookie } from "../hooks/useCookie";

const usePatchApi = (key: string, url: string, requireAuth: boolean = true) => {
  const COMPOUND_URL = `${API_URL}${url}`;
  const token = getCookie("accessToken");

  const patchDatas = async (body: Record<string, unknown>) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(COMPOUND_URL, options);

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.message);
    }

    const data = await res.json();

    return data;
  };

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: [key],
    mutationFn: patchDatas,
    onSuccess: () => {
      console.log("요청 성공");
    },
    onError: () => {
      console.log(`요청 실패: ${error}`);
    },
  });

  return { data, isPending, isError, error, mutate };
};

export default usePatchApi;
