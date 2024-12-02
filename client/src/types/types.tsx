interface Food {
  _id?: string;
  name: string;
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  imgUrl?: string;
}

interface User {
  username: string;
  displayName : string;
  avatarUrl: string;
}

export type { Food, User };
