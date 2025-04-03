const API_URL = "http://localhost:3000/api";

interface Material {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Intervention {
  id: string;
  title: string;
  description: string;
  conclusion: string | null;
  location: string;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  status: string;
  client: Client;
  employees: {
    employee: Employee;
  }[];
  materials: {
    material: Material;
    quantity: number;
  }[];
}

interface InterventionsResponse {
  success: boolean;
  data: Intervention[];
}

export const getInterventions = async (
  token: string
): Promise<InterventionsResponse> => {
  try {
    const response = await fetch(`${API_URL}/mobile/interventions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des interventions");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Une erreur est survenue");
  }
};
