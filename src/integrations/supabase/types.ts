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
      admin_properties: {
        Row: {
          baths: number | null
          beds: number | null
          created_at: string | null
          created_by: string | null
          description_en: string | null
          description_es: string | null
          elevator: boolean | null
          energy_cert: string | null
          featured: boolean | null
          features: string[] | null
          features_en: string[] | null
          floor: string | null
          garage: boolean | null
          id: string
          images: string[] | null
          legacy_id: string | null
          plot_size: number | null
          price: string
          property_type: string | null
          published: boolean | null
          reference: string | null
          rent_category: string | null
          slug: string
          sqm: number | null
          sqm_useful: number | null
          status: string | null
          title: string
          title_en: string | null
          type: string
          updated_at: string | null
          year_built: number | null
          zone: string
        }
        Insert: {
          baths?: number | null
          beds?: number | null
          created_at?: string | null
          created_by?: string | null
          description_en?: string | null
          description_es?: string | null
          elevator?: boolean | null
          energy_cert?: string | null
          featured?: boolean | null
          features?: string[] | null
          features_en?: string[] | null
          floor?: string | null
          garage?: boolean | null
          id?: string
          images?: string[] | null
          legacy_id?: string | null
          plot_size?: number | null
          price: string
          property_type?: string | null
          published?: boolean | null
          reference?: string | null
          rent_category?: string | null
          slug: string
          sqm?: number | null
          sqm_useful?: number | null
          status?: string | null
          title: string
          title_en?: string | null
          type?: string
          updated_at?: string | null
          year_built?: number | null
          zone: string
        }
        Update: {
          baths?: number | null
          beds?: number | null
          created_at?: string | null
          created_by?: string | null
          description_en?: string | null
          description_es?: string | null
          elevator?: boolean | null
          energy_cert?: string | null
          featured?: boolean | null
          features?: string[] | null
          features_en?: string[] | null
          floor?: string | null
          garage?: boolean | null
          id?: string
          images?: string[] | null
          legacy_id?: string | null
          plot_size?: number | null
          price?: string
          property_type?: string | null
          published?: boolean | null
          reference?: string | null
          rent_category?: string | null
          slug?: string
          sqm?: number | null
          sqm_useful?: number | null
          status?: string | null
          title?: string
          title_en?: string | null
          type?: string
          updated_at?: string | null
          year_built?: number | null
          zone?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          assigned_agent: string | null
          budget_max: number | null
          budget_min: number | null
          client_type: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          preferred_zones: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_agent?: string | null
          budget_max?: number | null
          budget_min?: number | null
          client_type?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          preferred_zones?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_agent?: string | null
          budget_max?: number | null
          budget_min?: number | null
          client_type?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          preferred_zones?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      crm_notes: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties_meta: {
        Row: {
          assigned_agent: string | null
          created_at: string | null
          featured: boolean | null
          id: string
          internal_notes: string | null
          property_slug: string
          published: boolean | null
          status: string | null
          submission_id: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_agent?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          internal_notes?: string | null
          property_slug: string
          published?: boolean | null
          status?: string | null
          submission_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_agent?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          internal_notes?: string | null
          property_slug?: string
          published?: boolean | null
          status?: string | null
          submission_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_meta_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "property_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      property_submissions: {
        Row: {
          address: string | null
          address_number: string | null
          assigned_agent: string | null
          bathrooms: number | null
          bedrooms: number | null
          built_area: number | null
          city: string | null
          community_fees: string | null
          community_included: boolean | null
          contact_email: string | null
          contact_mobile: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          door: string | null
          double_bedrooms: number | null
          exterior_carpentry: string | null
          extras: string[] | null
          floor: string | null
          id: string
          interior_carpentry: string | null
          net_area: number | null
          notes: string | null
          operation_type: string | null
          option_to_buy: boolean | null
          photos: string[] | null
          plot_area: number | null
          postal_code: string | null
          property_condition: string | null
          property_type: string | null
          province: string | null
          rental_price: string | null
          sale_price: string | null
          status: string | null
          toilets: number | null
          updated_at: string | null
          views: string | null
          zone: string | null
        }
        Insert: {
          address?: string | null
          address_number?: string | null
          assigned_agent?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          built_area?: number | null
          city?: string | null
          community_fees?: string | null
          community_included?: boolean | null
          contact_email?: string | null
          contact_mobile?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          door?: string | null
          double_bedrooms?: number | null
          exterior_carpentry?: string | null
          extras?: string[] | null
          floor?: string | null
          id?: string
          interior_carpentry?: string | null
          net_area?: number | null
          notes?: string | null
          operation_type?: string | null
          option_to_buy?: boolean | null
          photos?: string[] | null
          plot_area?: number | null
          postal_code?: string | null
          property_condition?: string | null
          property_type?: string | null
          province?: string | null
          rental_price?: string | null
          sale_price?: string | null
          status?: string | null
          toilets?: number | null
          updated_at?: string | null
          views?: string | null
          zone?: string | null
        }
        Update: {
          address?: string | null
          address_number?: string | null
          assigned_agent?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          built_area?: number | null
          city?: string | null
          community_fees?: string | null
          community_included?: boolean | null
          contact_email?: string | null
          contact_mobile?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          door?: string | null
          double_bedrooms?: number | null
          exterior_carpentry?: string | null
          extras?: string[] | null
          floor?: string | null
          id?: string
          interior_carpentry?: string | null
          net_area?: number | null
          notes?: string | null
          operation_type?: string | null
          option_to_buy?: boolean | null
          photos?: string[] | null
          plot_area?: number | null
          postal_code?: string | null
          property_condition?: string | null
          property_type?: string | null
          province?: string | null
          rental_price?: string | null
          sale_price?: string | null
          status?: string | null
          toilets?: number | null
          updated_at?: string | null
          views?: string | null
          zone?: string | null
        }
        Relationships: []
      }
      property_versions: {
        Row: {
          data_snapshot: Json
          edited_at: string | null
          edited_by: string | null
          id: string
          property_id: string
        }
        Insert: {
          data_snapshot: Json
          edited_at?: string | null
          edited_by?: string | null
          id?: string
          property_id: string
        }
        Update: {
          data_snapshot?: Json
          edited_at?: string | null
          edited_by?: string | null
          id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_versions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visits: {
        Row: {
          agent_id: string | null
          client_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          property_slug: string | null
          property_title: string | null
          status: string | null
          visit_date: string
        }
        Insert: {
          agent_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          property_slug?: string | null
          property_title?: string | null
          status?: string | null
          visit_date: string
        }
        Update: {
          agent_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          property_slug?: string | null
          property_title?: string | null
          status?: string | null
          visit_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_agent: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "agent"
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
    Enums: {
      app_role: ["admin", "agent"],
    },
  },
} as const
