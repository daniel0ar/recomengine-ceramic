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
  let i = 0;
  users.forEach(user => {
    if(user.id === userCeramicId){
      return i; // TODO: Break loop and then return, otherwise it is always returning -1
    }
    i++;
  });
  return -1;
} 

export const getItemFromIndex = (items: any[], itemIndex: number) => {
  return items[itemIndex];
}