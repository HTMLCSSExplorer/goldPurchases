import { data } from '~~/server/data.json';
export default defineEventHandler(async (event) => {
  return data;
});
