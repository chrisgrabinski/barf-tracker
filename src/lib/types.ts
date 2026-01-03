export interface BarfEntry {
  id: number;
  created_at: string;
  updated_at: string | null;
  hidden: boolean;
  food_type?: string | null;
}

