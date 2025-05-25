const pagination = (page, productPerPage) => {
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  return {startIndex, endIndex};
};

export default pagination