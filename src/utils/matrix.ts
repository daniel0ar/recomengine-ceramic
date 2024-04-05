export const createMatrix = (ratings: any[], users: any[], items: any[]) => {
  const rows = users.length;
  const columns = items.length;
  let ratingsArr: number[][] = [];

  for (let i = 0; i < rows; i++) {
    ratingsArr[i] = [];
    for (let j = 0; j < columns; j++) {
      ratingsArr[i][j] = ratings[users[i]][items[j]]
    }
  }
  return ratingsArr
}

export const getIndexOfUser = (users: any[], userCeramicId: string) => {
  return users.indexOf(userCeramicId);
} 

export const getItemFromIndex = (items: any[], itemIndex: number) => {
  return items[itemIndex];
}