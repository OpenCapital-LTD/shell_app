import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useGiraf } from "../giraff";
import appConfig from "../config";


// const API_KEY = import.meta.env.VITE_API_KEY
// const API_KEY = process.env.VITE_API_KEY
const API_KEY = appConfig.api.VITE_API_KEY

function usePostApi() {
    //   const { endPoint, params } = apiProps;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { gHead, addGHead } = useGiraf()
    const headerConfig = { "x-api-key": API_KEY, Authorization: gHead.auth_token }

    const actionRequest = async ({
        endPoint,
        params,
        ctype,
        hd
    }) => {
        const configType = ctype || "AUTH";
        setError(null);
        setData(null);
        setLoading(true);

        try {
            const { data: res } = await axios.post(endPoint, params, { headers: { ...headerConfig, ...hd } })
            setData(res)
            setLoading(false)
            return res
        } catch (err) {
            let errorMessage = err.response?.data.message || err.message
            console.log(errorMessage)
            if (!errorMessage) errorMessage = err.message
            setError(errorMessage);
            setLoading(false)

            throw new Error(errorMessage)

        }

    };
    return { data, loading, error, actionRequest, setError, setData, setLoading };
}
export default usePostApi;
