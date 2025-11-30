import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { API_KEY } from '@/constants';

const useNewSession = () => {
    const router = useRouter();
    const { request_token, approved } = router.query;
    const { setAuthData } = useAuth();

    const fetchAccountId = useCallback(async (sessionId: string): Promise<number | null> => {
        try {
            const accountResponse = await fetch(
                `https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${API_KEY}`
            );
            const accountData = await accountResponse.json();
            return accountData.id || null;
        } catch (error) {
            console.error("Account ID Retrieval Error:", error);
            return null;
        }
    }, [API_KEY]);

    const exchangeTokenForSession = useCallback(async (approvedToken: string) => {
        try {
            const sessionResponse = await fetch(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ request_token: approvedToken }),
                }
            );

            const sessionData = await sessionResponse.json();

            if (!sessionData.success || !sessionData.session_id) {
                throw new Error(sessionData.status_message || 'Failed to create session.');
            }
            
            const newSessionId = sessionData.session_id;
            const newAccountId = await fetchAccountId(newSessionId);
            
            if (newAccountId) {
                setAuthData({ sessionId: newSessionId, accountId: newAccountId });
                console.log("Authentication successful and session data saved.");
            } else {
                throw new Error('Failed to retrieve account ID.');
            }
            
        } catch (error) {
            console.error("Authentication Finalization Error:", error);
            router.push('/user/login'); 
        }
    }, [API_KEY, setAuthData, fetchAccountId, router]);

    useEffect(() => {
        if (router.isReady && approved === 'true' && typeof request_token === 'string') {
            exchangeTokenForSession(request_token);
            router.replace('/', undefined, { shallow: true }); 
        }

        if (router.isReady && approved === 'false') {
            console.log("TMDb authentication was denied by the user.");
            router.replace('/', undefined, { shallow: true });
        }
    }, [router.isReady, request_token, approved, exchangeTokenForSession, router]);
};

export default useNewSession;