import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useCombo = (id: string | undefined) => {
  return useQuery({
    queryKey: ['combo', id],
    queryFn: async () => {
      if (!id) throw new Error('Combo ID is required');

      // Obtener el combo
      const { data: combo, error: comboError } = await supabase
        .from('combo')
        .select('*')
        .eq('id', id)
        .single();

      if (comboError) throw comboError;

      // Obtener los productos relacionados
      const { data: relations, error: relError } = await supabase
        .from('combo_product')
        .select(`
          cantidad,
          product:producto (
            id,
            name,
            img_url,
            price,
            category
          )
        `)
        .eq('combo_id', id);

      if (relError) throw relError;

      return {
        ...combo,
        products: relations.map((rel: any) => ({
          ...rel.product,
          cantidad: rel.cantidad
        }))
      };
    },
    enabled: !!id,
  });
};
