import 'dotenv/config';

if (!process.env.TMDb_API_KEY) {
    throw new Error("TMBd_API_KEY is not defined in the environment variables.");
}

if(!process.env.OMDb_API_KEY) {
    throw new Error("OMDd_API_KEY is not defined in the environment variables.");
}

export const TMDb_API_KEY = process.env.TMDb_API_KEY;
export const OMDb_API_KEY = process.env.OMDb_API_KEY;