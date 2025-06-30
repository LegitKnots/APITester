import React, { createContext, useContext, useState } from 'react';
import { Headers, Body } from 'types/APIs'

type APICallDraft = {
  headers: Headers[];
  body: Body[];
};

const APICallDraftContext = createContext<{
  draft: APICallDraft;
  setDraft: React.Dispatch<React.SetStateAction<APICallDraft>>;
}>({
  draft: { headers: [], body: [] },
  setDraft: () => {},
});

export const APICallDraftProvider = ({ children }: { children: React.ReactNode }) => {
  const [draft, setDraft] = useState<APICallDraft>({ headers: [], body: [] });
  return (
    <APICallDraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </APICallDraftContext.Provider>
  );
};

export const useAPICallDraft = () => useContext(APICallDraftContext);
