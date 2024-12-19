interface Food {
  _id?: string;
  name: string;
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  imgUrl?: string;
  portionSize?: number;
}

interface User {
  username: string;
  displayName: string;
  avatarUrl: string;
  isAdmin: boolean;
}

export type { Food, User };
