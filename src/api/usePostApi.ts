import { useMutation } from "@tanstack/react-query";
import { getCookie } from "../hooks/useCookie";
import { API_URL } from "./URL";

const usePostApi = (key: string, url: string, requireAuth: boolean = true) => {
    const COMPOUND_URL = `${API_URL}${url}`;
    const token = getCookie("accessToken");

    const postData = async (body: Record<string, unknown>, file?: File) => {
        const formData = new FormData();

        // JSON을 "request" 파트에 넣음
        formData.append(
            "request",
            new Blob([JSON.stringify(body)], { type: "application/json" })
        );

        // 이미지가 있으면 requirementsImage로 추가
        if (file) {
            formData.append("requirementsImage", file);
        }

        const headers: HeadersInit = {
            ...(requireAuth && token
                ? { Authorization: `Bearer ${token}` }
                : {}),
        };

        const res = await fetch(COMPOUND_URL, {
            method: "POST",
            headers,
            body: formData,
        });

        if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse.message);
        }

        return await res.json();
    };

    const { mutate, data, error, isError, isPending } = useMutation({
        mutationKey: [key],
        mutationFn: (vars: { body: Record<string, unknown>; file?: File }) =>
            postData(vars.body, vars.file),
    });

    return { data, isPending, error, isError, mutate };
};

export default usePostApi;
