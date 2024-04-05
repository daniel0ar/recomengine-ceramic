import recommend from "collaborative-filter"

export const getRecommendedItems = (ratings: number[][], userIndex: number) => {
  return recommend.cFilter(ratings, userIndex)
}