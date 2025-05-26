const pagination = (page, perPage, data) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const totalPage = Math.ceil(data.length / perPage);
  const pageWiseData = data.slice(startIndex, endIndex);

  return { pageWiseData, totalPage };
};

export default pagination;
