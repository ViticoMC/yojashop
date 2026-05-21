import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Logro } from "@/types/combo";

export const useAdminLogros = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-logros"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("logro")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Logro[];
    },
    staleTime: 3 * 60 * 1000, // 3 minutos
  });

  const createMutation = useMutation({
    mutationFn: async (newLogro: Omit<Logro, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("logro")
        .insert([newLogro])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-logros"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("logro").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-logros"] });
    },
  });

  return {
    logros: query.data || [],
    loading: query.isLoading,
    error: query.error,
    createLogro: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteLogro: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
