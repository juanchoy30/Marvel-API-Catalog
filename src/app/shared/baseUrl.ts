import { PUBLIC_KEY, TS, HASH, URL_MARVEL } from './validationKeys'

export const baseURL = `${URL_MARVEL}apikey=${PUBLIC_KEY}&ts=${TS}&hash=${HASH}`;