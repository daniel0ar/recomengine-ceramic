export const createMatrix = (ratings: Record<string,any>, users: any[], items: any[]) => {
  const rows = users.length;
  const columns = items.length;
  let ratingsArr: number[][] = [];

  for (let i = 0; i < rows; i++) {
    ratingsArr[i] = [];
    for (let j = 0; j < columns; j++) {
      ratingsArr[i][j] = ratings[users[i].id][items[j].id]
    }
  }
  return ratingsArr
}

export const getIndexOfUser = (users: any[], userCeramicId: string) => {
  for (let i = 0; i < users.length; i++) {
    if(users[i].id === userCeramicId){
      return i;
    }
  }
  return -1;
} 

export const getItemFromIndex = (items: any[], itemIndex: number) => {
  return items[itemIndex];
}