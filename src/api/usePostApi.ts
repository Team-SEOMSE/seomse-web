import { useMutation } from "@tanstack/react-query";
import { getCookie } from "../hooks/useCookie";
import { API_URL } from "./URL";

type Mode = "json" | "multipart";

interface ErrorResponse {
  code?: string;
  message: string;
  [key: string]: unknown;
}

interface MutationVars {
  body: Record<string, unknown>;
  file?: File;
}

const usePostApi = (
  key: string,
  url: string,
  requireAuth: boolean = true,
  mode: Mode = "json"
) => {
  const COMPOUND_URL = `${API_URL}${url}`;
  const token = getCookie("accessToken");

  const postData = async (body: Record<string, unknown>, file?: File) => {
    const headers: HeadersInit = {
      ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    let fetchOptions: RequestInit;

    if (mode === "json") {
      fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      };
    } else {
      const formData = new FormData();

      const jsonString = JSON.stringify(body);
      const jsonBlob = new Blob([jsonString], {
        type: "application/json;charset=utf-8",
      });
      formData.append("request", jsonBlob, "request.json");

      if (file) {
        formData.append("requirementsImage", file, file.name);
      }

      fetchOptions = {
        method: "POST",
        headers,
        body: formData,
      };
    }

    const res = await fetch(COMPOUND_URL, fetchOptions);

    if (!res.ok) {
      let errorResponse: ErrorResponse;
      try {
        errorResponse = (await res.json()) as ErrorResponse;
      } catch {
        errorResponse = { message: "서버에서 JSON 응답 아님" };
      }
      console.error("❌ 서버 에러 응답:", errorResponse);
      throw new Error(errorResponse.message || "Unknown server error");
    }

    return (await res.json()) as unknown;
  };

  const { mutate, data, error, isError, isPending } = useMutation({
    mutationKey: [key],
    mutationFn: (vars: MutationVars) => postData(vars.body, vars.file),
  });

  return { data, isPending, error, isError, mutate };
};

export default usePostApi;
