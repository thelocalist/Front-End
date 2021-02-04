export default function switchPage(
  searchResultsPage,
  direction,
  PAGESIZE,
  searchResultsCount
) {
  let pageNumber = searchResultsPage;

  if (direction === 'forward') {
    pageNumber += 1;
  } else if (direction === 'back') {
    pageNumber -= 1;
  }

  if (
    pageNumber < 0 ||
    (searchResultsCount - PAGESIZE * pageNumber < 1 && searchResultsCount)
  ) {
    return null;
  }

  return pageNumber;
}
