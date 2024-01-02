import { API } from '../baseAI';

const cameraApi = API.injectEndpoints({
  endpoints: (build) => ({
    scanner: build.mutation<any, string>({
      query: (body) => ({
        url: 'detect',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useScannerMutation } = cameraApi;
