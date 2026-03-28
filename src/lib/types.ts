type FoodType = {
  created_at: string;
  id: number;
  name: string;
  slug: string;
};

export type Food = {
  created_at: string;
  id: number;
  name: string;
  slug: string;
  type: string;
};

export interface BarfEntry {
  id: number;
  created_at: string;
  updated_at: string | null;
  hidden: boolean | null;
  food:
    | (Omit<Food, "type"> & {
        type: FoodType;
      })
    | null;
  notes: string | null;
}
