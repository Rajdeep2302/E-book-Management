export const paginate = (page = 1, limit = 10) => {
  page = Number(page);
  limit = Number(limit);
  const offset = (page - 1) * limit;
  return { limit, offset };
};
