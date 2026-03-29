export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      clinics: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          city: string
          country: string
          created_at: string
          id: number
          image: string | null
          name: string
          phone: string | null
          post_code: string
          slug: string
          url: string | null
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          city: string
          country: string
          created_at?: string
          id?: number
          image?: string | null
          name: string
          phone?: string | null
          post_code: string
          slug?: string
          url?: string | null
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: number
          image?: string | null
          name?: string
          phone?: string | null
          post_code?: string
          slug?: string
          url?: string | null
        }
        Relationships: []
      }
      doctors: {
        Row: {
          clinic: string | null
          created_at: string
          id: number
          image: string | null
          name: string
          role: string | null
          slug: string | null
        }
        Insert: {
          clinic?: string | null
          created_at?: string
          id?: number
          image?: string | null
          name: string
          role?: string | null
          slug?: string | null
        }
        Update: {
          clinic?: string | null
          created_at?: string
          id?: number
          image?: string | null
          name?: string
          role?: string | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vets_clinic_fkey"
            columns: ["clinic"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["slug"]
          },
        ]
      }
      emesis_events: {
        Row: {
          created_at: string
          datetime: string
          food: string | null
          hidden: boolean | null
          id: number
          notes: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          datetime?: string
          food?: string | null
          hidden?: boolean | null
          id?: number
          notes?: string | null
          slug?: string
        }
        Update: {
          created_at?: string
          datetime?: string
          food?: string | null
          hidden?: boolean | null
          id?: number
          notes?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_food_fkey"
            columns: ["food"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["slug"]
          },
        ]
      }
      event_type: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      feeding_events: {
        Row: {
          amount: number | null
          created_at: string
          datetime: string
          food: string
          hidden: boolean | null
          id: number
          slug: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          datetime?: string
          food: string
          hidden?: boolean | null
          id?: number
          slug?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          datetime?: string
          food?: string
          hidden?: boolean | null
          id?: number
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "feeding_events_food_fkey"
            columns: ["food"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["slug"]
          },
        ]
      }
      food: {
        Row: {
          created_at: string
          id: number
          name: string
          notes: string | null
          slug: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          notes?: string | null
          slug?: string
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          notes?: string | null
          slug?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "food_type"
            referencedColumns: ["slug"]
          },
        ]
      }
      food_type: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      pets: {
        Row: {
          birthdate: string | null
          breed: string | null
          clinic: string | null
          created_at: string
          doctor: string | null
          environment: string | null
          given_date: string | null
          id: number
          image: string | null
          name: string
          sex: string | null
          slug: string
        }
        Insert: {
          birthdate?: string | null
          breed?: string | null
          clinic?: string | null
          created_at?: string
          doctor?: string | null
          environment?: string | null
          given_date?: string | null
          id?: number
          image?: string | null
          name: string
          sex?: string | null
          slug?: string
        }
        Update: {
          birthdate?: string | null
          breed?: string | null
          clinic?: string | null
          created_at?: string
          doctor?: string | null
          environment?: string | null
          given_date?: string | null
          id?: number
          image?: string | null
          name?: string
          sex?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "pets_clinic_fkey"
            columns: ["clinic"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "pets_doctor_fkey"
            columns: ["doctor"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["slug"]
          },
        ]
      }
      weight_events: {
        Row: {
          created_at: string
          datetime: string
          hidden: boolean | null
          id: number
          slug: string
          value: number
        }
        Insert: {
          created_at?: string
          datetime?: string
          hidden?: boolean | null
          id?: number
          slug?: string
          value: number
        }
        Update: {
          created_at?: string
          datetime?: string
          hidden?: boolean | null
          id?: number
          slug?: string
          value?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
