import { API_KEY } from "@/constants";
import { useCallback, useEffect, useState } from "react";

const REDIRECT_PAGE = "https://picturamovens.vercel.app/";
const useTmdbAuth = () => {
    const [newToken, setNewToken] = useState<string | null>(null);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

    const fetchNewToken = useCallback(async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success && data.request_token) {
                const requestToken = data.request_token;
                setNewToken(requestToken);
                const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${REDIRECT_PAGE}`;
                setRedirectUrl(authUrl);
                
            } else {
                console.error("Error: TMDb did not return a valid request token.", data);
            }

        } catch (error) {
            console.error("Error fetching new token:", error);
        }
    }, [API_KEY]);

    useEffect(() => {
        if (!newToken) {
            fetchNewToken();
        }
    }, [fetchNewToken, newToken]);

    return { newToken, redirectUrl, fetchNewToken };
};

export default useTmdbAuth;