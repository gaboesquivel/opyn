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
      asset: {
        Row: {
          address: string
          created_at: string
          decimals: number
          image_url: string | null
          name: string
          stablecoin: boolean
          symbol: string
          uuid: string
        }
        Insert: {
          address: string
          created_at?: string
          decimals?: number
          image_url?: string | null
          name: string
          stablecoin?: boolean
          symbol: string
          uuid?: string
        }
        Update: {
          address?: string
          created_at?: string
          decimals?: number
          image_url?: string | null
          name?: string
          stablecoin?: boolean
          symbol?: string
          uuid?: string
        }
        Relationships: []
      }
      balance: {
        Row: {
          address: string
          half: number | null
          market_id: string | null
          one: number | null
          two: number | null
          zero: number | null
        }
        Insert: {
          address: string
          half?: number | null
          market_id?: string | null
          one?: number | null
          two?: number | null
          zero?: number | null
        }
        Update: {
          address?: string
          half?: number | null
          market_id?: string | null
          one?: number | null
          two?: number | null
          zero?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'balance_address_fkey'
            columns: ['address']
            isOneToOne: true
            referencedRelation: 'user'
            referencedColumns: ['address']
          },
          {
            foreignKeyName: 'balance_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
        ]
      }
      chainlink_price_feed: {
        Row: {
          asset: string
          asset_uuid: string | null
          created_at: string | null
          feed: string
          id: number
          numeraire: string
          numeraire_uuid: string | null
          updated_at: string | null
        }
        Insert: {
          asset: string
          asset_uuid?: string | null
          created_at?: string | null
          feed: string
          id: number
          numeraire: string
          numeraire_uuid?: string | null
          updated_at?: string | null
        }
        Update: {
          asset?: string
          asset_uuid?: string | null
          created_at?: string | null
          feed?: string
          id?: number
          numeraire?: string
          numeraire_uuid?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'chainlink_price_feed_asset_fkey'
            columns: ['asset_uuid']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
          {
            foreignKeyName: 'chainlink_price_feed_numeraire_fkey'
            columns: ['numeraire_uuid']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
        ]
      }
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
          asset_flo: string
          auction: string
          controller: string
          crab_world: string
          created_at: string
          deployer: string
          half_crab: string
          id: string
          is_active: boolean | null
          is_immutable: boolean | null
          label: string
          numeraire: string
          oracle: string | null
          oracle_type: Database['public']['Enums']['oracle_type'] | null
          power_perp_factory: string | null
          redemption: string | null
          safetypool: string | null
          shutdown: string | null
          span_margin: string | null
          stable_flo: string
          two_crab: string
          two_perp_long: string | null
          two_perp_short: string | null
          underlier: string
          updated_at: string | null
        }
        Insert: {
          asset_flo: string
          auction: string
          controller: string
          crab_world: string
          created_at?: string
          deployer: string
          half_crab: string
          id: string
          is_active?: boolean | null
          is_immutable?: boolean | null
          label: string
          numeraire: string
          oracle?: string | null
          oracle_type?: Database['public']['Enums']['oracle_type'] | null
          power_perp_factory?: string | null
          redemption?: string | null
          safetypool?: string | null
          shutdown?: string | null
          span_margin?: string | null
          stable_flo: string
          two_crab: string
          two_perp_long?: string | null
          two_perp_short?: string | null
          underlier: string
          updated_at?: string | null
        }
        Update: {
          asset_flo?: string
          auction?: string
          controller?: string
          crab_world?: string
          created_at?: string
          deployer?: string
          half_crab?: string
          id?: string
          is_active?: boolean | null
          is_immutable?: boolean | null
          label?: string
          numeraire?: string
          oracle?: string | null
          oracle_type?: Database['public']['Enums']['oracle_type'] | null
          power_perp_factory?: string | null
          redemption?: string | null
          safetypool?: string | null
          shutdown?: string | null
          span_margin?: string | null
          stable_flo?: string
          two_crab?: string
          two_perp_long?: string | null
          two_perp_short?: string | null
          underlier?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'market_numeraire_fkey'
            columns: ['numeraire']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
          {
            foreignKeyName: 'market_underlier_fkey'
            columns: ['underlier']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
        ]
      }
      market_collateral: {
        Row: {
          collateral_address: string
          created_at: string | null
          id: number
          market_id: string
          updated_at: string | null
        }
        Insert: {
          collateral_address: string
          created_at?: string | null
          id?: number
          market_id: string
          updated_at?: string | null
        }
        Update: {
          collateral_address?: string
          created_at?: string | null
          id?: number
          market_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'market_collateral_collateral_address_fkey'
            columns: ['collateral_address']
            isOneToOne: false
            referencedRelation: 'whitelisted_collateral'
            referencedColumns: ['collateral_address']
          },
          {
            foreignKeyName: 'market_collateral_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
        ]
      }
      market_metric: {
        Row: {
          created_at: string | null
          fees_collected: number
          liquidity: number
          market_id: string
          num_traders: number
          open_interest: number
          updated_at: string | null
          volume_24h: number
          volume_30d: number
          volume_7d: number
        }
        Insert: {
          created_at?: string | null
          fees_collected?: number
          liquidity?: number
          market_id: string
          num_traders?: number
          open_interest?: number
          updated_at?: string | null
          volume_24h?: number
          volume_30d?: number
          volume_7d?: number
        }
        Update: {
          created_at?: string | null
          fees_collected?: number
          liquidity?: number
          market_id?: string
          num_traders?: number
          open_interest?: number
          updated_at?: string | null
          volume_24h?: number
          volume_30d?: number
          volume_7d?: number
        }
        Relationships: [
          {
            foreignKeyName: 'market_metric_market_id_fkey'
            columns: ['market_id']
            isOneToOne: true
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
        ]
      }
      market_perp: {
        Row: {
          created_at: string | null
          funding_fee: number
          id: number
          initial_carry: number
          is_active: boolean | null
          liquidation_fee: number
          lower_carry: number
          market_id: string
          minting_fee: number
          perp_type: Database['public']['Enums']['perp_type']
          updated_at: string | null
          upper_carry: number
        }
        Insert: {
          created_at?: string | null
          funding_fee: number
          id?: number
          initial_carry: number
          is_active?: boolean | null
          liquidation_fee: number
          lower_carry: number
          market_id: string
          minting_fee: number
          perp_type: Database['public']['Enums']['perp_type']
          updated_at?: string | null
          upper_carry: number
        }
        Update: {
          created_at?: string | null
          funding_fee?: number
          id?: number
          initial_carry?: number
          is_active?: boolean | null
          liquidation_fee?: number
          lower_carry?: number
          market_id?: string
          minting_fee?: number
          perp_type?: Database['public']['Enums']['perp_type']
          updated_at?: string | null
          upper_carry?: number
        }
        Relationships: [
          {
            foreignKeyName: 'market_perp_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
        ]
      }
      portfolio_health: {
        Row: {
          created_at: string | null
          health_score: number
          id: number
          last_updated: string
          market_id: string
          updated_at: string | null
          user_address: string
        }
        Insert: {
          created_at?: string | null
          health_score: number
          id?: never
          last_updated?: string
          market_id: string
          updated_at?: string | null
          user_address: string
        }
        Update: {
          created_at?: string | null
          health_score?: number
          id?: never
          last_updated?: string
          market_id?: string
          updated_at?: string | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: 'portfolio_health_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'portfolio_health_user_address_fkey'
            columns: ['user_address']
            isOneToOne: false
            referencedRelation: 'user'
            referencedColumns: ['address']
          },
        ]
      }
      pyth_price_feed: {
        Row: {
          asset: string
          asset_uuid: string | null
          created_at: string | null
          id: number
          numeraire: string
          numeraire_uuid: string | null
          price_id: string
          updated_at: string | null
        }
        Insert: {
          asset: string
          asset_uuid?: string | null
          created_at?: string | null
          id: number
          numeraire: string
          numeraire_uuid?: string | null
          price_id: string
          updated_at?: string | null
        }
        Update: {
          asset?: string
          asset_uuid?: string | null
          created_at?: string | null
          id?: number
          numeraire?: string
          numeraire_uuid?: string | null
          price_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'pyth_price_feed_asset_fkey'
            columns: ['asset_uuid']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
          {
            foreignKeyName: 'pyth_price_feed_numeraire_fkey'
            columns: ['numeraire_uuid']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
        ]
      }
      temp_market_data: {
        Row: {
          change_24hr: number
          created_at: string | null
          id: number
          index_price: number
          mark_price: number
          market_id: string
          updated_at: string | null
        }
        Insert: {
          change_24hr: number
          created_at?: string | null
          id?: never
          index_price: number
          mark_price: number
          market_id: string
          updated_at?: string | null
        }
        Update: {
          change_24hr?: number
          created_at?: string | null
          id?: never
          index_price?: number
          mark_price?: number
          market_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'temp_market_data_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
        ]
      }
      transactions: {
        Row: {
          created_at: string | null
          from_address: string
          id: number
          market_id: string
          perp_id: number
          quantity_amount: number
          status: string
          to_address: string
          token: string
          transaction_hash: string
          transaction_timestamp: string
          transaction_type: string
          updated_at: string | null
          usd_amount: number
        }
        Insert: {
          created_at?: string | null
          from_address: string
          id?: never
          market_id: string
          perp_id: number
          quantity_amount: number
          status: string
          to_address: string
          token: string
          transaction_hash: string
          transaction_timestamp?: string
          transaction_type: string
          updated_at?: string | null
          usd_amount: number
        }
        Update: {
          created_at?: string | null
          from_address?: string
          id?: never
          market_id?: string
          perp_id?: number
          quantity_amount?: number
          status?: string
          to_address?: string
          token?: string
          transaction_hash?: string
          transaction_timestamp?: string
          transaction_type?: string
          updated_at?: string | null
          usd_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transactions_perp_id_fkey'
            columns: ['perp_id']
            isOneToOne: false
            referencedRelation: 'market_perp'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transactions_token_fkey'
            columns: ['token']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
        ]
      }
      uniswap_pool: {
        Row: {
          created_at: string | null
          id: number
          market_id: string
          token0: string
          token0_uuid: string | null
          token1: string
          token1_uuid: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          market_id: string
          token0: string
          token0_uuid?: string | null
          token1: string
          token1_uuid?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          market_id?: string
          token0?: string
          token0_uuid?: string | null
          token1?: string
          token1_uuid?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'uniswap_pool_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'uniswap_pool_token0_uuid_fkey'
            columns: ['token0_uuid']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
          {
            foreignKeyName: 'uniswap_pool_token1_uuid_fkey'
            columns: ['token1_uuid']
            isOneToOne: false
            referencedRelation: 'asset'
            referencedColumns: ['uuid']
          },
        ]
      }
      user: {
        Row: {
          address: string
          created_at: string
          notifications_enabled: boolean
          telegram: string | null
        }
        Insert: {
          address: string
          created_at?: string
          notifications_enabled?: boolean
          telegram?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          notifications_enabled?: boolean
          telegram?: string | null
        }
        Relationships: []
      }
      user_market_collateral: {
        Row: {
          balance: number
          created_at: string | null
          id: number
          market_id: string | null
          updated_at: string | null
          user_address: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: never
          market_id?: string | null
          updated_at?: string | null
          user_address: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: never
          market_id?: string | null
          updated_at?: string | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_market_collateral_market_id_fkey'
            columns: ['market_id']
            isOneToOne: false
            referencedRelation: 'market'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_market_collateral_user_address_fkey'
            columns: ['user_address']
            isOneToOne: false
            referencedRelation: 'user'
            referencedColumns: ['address']
          },
        ]
      }
      whitelisted_collateral: {
        Row: {
          chainlink_adapter: string | null
          collateral_address: string
          collateral_name: string | null
          created_at: string | null
          engine: string | null
          id: number
          is_default: boolean | null
          pyth_adapter: string | null
          uniswap_adapter: string | null
          updated_at: string | null
        }
        Insert: {
          chainlink_adapter?: string | null
          collateral_address: string
          collateral_name?: string | null
          created_at?: string | null
          engine?: string | null
          id?: number
          is_default?: boolean | null
          pyth_adapter?: string | null
          uniswap_adapter?: string | null
          updated_at?: string | null
        }
        Update: {
          chainlink_adapter?: string | null
          collateral_address?: string
          collateral_name?: string | null
          created_at?: string | null
          engine?: string | null
          id?: number
          is_default?: boolean | null
          pyth_adapter?: string | null
          uniswap_adapter?: string | null
          updated_at?: string | null
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
      aggregate_market_metrics: {
        Args: {
          sort_field?: string
          sort_direction?: string
          page_limit?: number
          page_offset?: number
        }
        Returns: {
          underlier_asset_symbol: string
          underlier_asset_name: string
          underlier_asset_image_url: string
          num_markets: number
          total_liquidity: number
          total_volume_24h: number
          total_volume_7d: number
          total_volume_30d: number
          total_open_interest: number
          total_num_traders: number
          total_fees_collected: number
        }[]
      }
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
    }
    Enums: {
      oracle_type: 'CHAINLINK' | 'PYTH' | 'UNISWAP'
      perp_type: 'zero_perp' | 'half_perp' | 'one_perp' | 'two_perp'
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
