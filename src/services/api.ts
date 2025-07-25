import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Configuration de base de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Interface pour les réservations selon vos spécifications
export interface Voyage {
  id: number;
  depart: string;
  arrivee: string;
  prix: number;
  nombre_passagers: number;
}



// Interface pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Classe pour les erreurs API
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Service API principal
class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur de requête
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`🚀 Requête ${config.method?.toUpperCase()} vers ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Erreur dans la requête:', error);
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponse
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ Réponse reçue de ${response.config.url}:`, response.status);
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ Erreur dans la réponse:', error.response?.status, error.message);
        
        const apiError = new ApiError(
          (error.response?.data as any)?.message || error.message || 'Erreur de communication avec le serveur',
          error.response?.status || 0
        );
        
        return Promise.reject(apiError);
      }
    );
  }

  // === MÉTHODES POUR RÉCUPÉRER LES DONNÉES ===

  // Récupérer toutes les réservations
  async getAllReservations(): Promise<Voyage[]> {
    try {
      const response = await this.axiosInstance.get<Voyage[]>('/');
      return response.data || [];
    } catch (error) {
      throw error;
    }
  }

  // Récupérer une réservation par ID
  async getReservationById(id: number): Promise<Voyage | null> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<Voyage>>(`/voyages/${id}`);
      return response.data.data || null;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  

  

  // Supprimer une réservation
  async deleteReservation(id: number): Promise<boolean> {
    try {
      await this.axiosInstance.delete(`/reservations/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Rechercher des réservations par point de départ
  async getReservationsByDepart(depart: string): Promise<Voyage[]> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<Voyage[]>>(`/reservations/depart/${encodeURIComponent(depart)}`);
      return response.data.data || [];
    } catch (error) {
      throw error;
    }
  }

  // Rechercher des réservations par point d'arrivée
  async getReservationsByArrivee(arrivee: string): Promise<Voyage[]> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<Voyage[]>>(`/reservations/arrivee/${encodeURIComponent(arrivee)}`);
      return response.data.data || [];
    } catch (error) {
      throw error;
    }
  }

  // Rechercher des réservations par trajet (départ et arrivée)
  async getReservationsByTrajet(depart: string, arrivee: string): Promise<Voyage[]> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<Voyage[]>>('/reservations/trajet', {
        params: {
          depart,
          arrivee
        }
      });
      return response.data.data || [];
    } catch (error) {
      throw error;
    }
  }

  // Rechercher des réservations par nombre de passagers
  async getReservationsByPassengers(nombre_passagers: number): Promise<Voyage[]> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<Voyage[]>>(`/reservations/passagers/${nombre_passagers}`);
      return response.data.data || [];
    } catch (error) {
      throw error;
    }
  }

  // Rechercher des réservations par fourchette de prix
  async getReservationsByPriceRange(prixMin: number, prixMax: number): Promise<Voyage[]> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<Voyage[]>>('/reservations/prix', {
        params: {
          min: prixMin,
          max: prixMax
        }
      });
      return response.data.data || [];
    } catch (error) {
      throw error;
    }
  }

  // Récupérer les statistiques des réservations
  async getReservationStats(): Promise<{
    total: number;
    moyenne_prix: number;
    moyenne_passagers: number;
    trajets_populaires: { depart: string; arrivee: string; count: number }[];
  }> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<any>>('/reservations/stats');
      return response.data.data!;
    } catch (error) {
      throw error;
    }
  }
}

// Export de l'instance unique du service
export const api = new ApiService();

// Export par défaut
export default api;
