export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      document_sections: {
        Row: {
          content: string
          document_id: number
          embedding: string | null
          id: number
        }
        Insert: {
          content: string
          document_id: number
          embedding?: string | null
          id?: never
        }
        Update: {
          content?: string
          document_id?: number
          embedding?: string | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: 'document_sections_document_id_fkey'
            columns: ['document_id']
            isOneToOne: false
            referencedRelation: 'documents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'document_sections_document_id_fkey'
            columns: ['document_id']
            isOneToOne: false
            referencedRelation: 'documents_with_storage_path'
            referencedColumns: ['id']
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          created_by: string
          id: number
          name: string
          storage_object_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: never
          name: string
          storage_object_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: never
          name?: string
          storage_object_id?: string
        }
        Relationships: []
      }
      market: {
        Row: {
          address: string
          base_asset: string
          created_at: string
          label: string
          quote_asset: string
        }
        Insert: {
          address: string
          base_asset: string
          created_at?: string
          label: string
          quote_asset: string
        }
        Update: {
          address?: string
          base_asset?: string
          created_at?: string
          label?: string
          quote_asset?: string
        }
        Relationships: [
          {
            foreignKeyName: 'markets_base_asset_fkey'
            columns: ['base_asset']
            isOneToOne: false
            referencedRelation: 'token'
            referencedColumns: ['uuid']
          },
          {
            foreignKeyName: 'markets_quote_asset_fkey'
            columns: ['quote_asset']
            isOneToOne: false
            referencedRelation: 'token'
            referencedColumns: ['uuid']
          },
        ]
      }
      token: {
        Row: {
          address: string
          chain_id: number
          created_at: string
          decimals: number | null
          symbol: string
          uuid: string
        }
        Insert: {
          address: string
          chain_id: number
          created_at?: string
          decimals?: number | null
          symbol: string
          uuid?: string
        }
        Update: {
          address?: string
          chain_id?: number
          created_at?: string
          decimals?: number | null
          symbol?: string
          uuid?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          address: string
          created_at: string
          ens: string | null
          notifs: boolean | null
          telegram: string | null
        }
        Insert: {
          address: string
          created_at?: string
          ens?: string | null
          notifs?: boolean | null
          telegram?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          ens?: string | null
          notifs?: boolean | null
          telegram?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      documents_with_storage_path: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number | null
          name: string | null
          storage_object_id: string | null
          storage_object_path: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      match_document_sections: {
        Args: {
          embedding: string
          match_threshold: number
        }
        Returns: {
          content: string
          document_id: number
          embedding: string | null
          id: number
        }[]
      }
      supabase_url: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
