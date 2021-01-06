export const getUser = store =>
  store && store.user ? store.user : null;

export const getScore = store => 
  store && store.score ? store.score : 0;