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
  _id?: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isAdmin: boolean;
}

interface Intake {
  userForeignKey: string;
  foodForeignKey: string;
  amountInGrams: number;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
}

interface DateObj {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export type { Food, User, Intake , DateObj};
