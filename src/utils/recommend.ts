import recommend from "collaborative-filter"
import { createMatrix, getIndexOfUser } from "./matrix"

export const getRecommendedItems = (ratings: Record<string, any>, userId: string, users: any[], items: any[]) => {
  const ratingsMatrix = createMatrix(ratings, users, items);
  const userIndex = getIndexOfUser(users,userId);
  return recommend.cFilter(ratingsMatrix, userIndex)
}