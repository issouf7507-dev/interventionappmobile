const API_URL = "http://localhost:3000/api";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    employeeTypeId: string;
  };
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur de connexion");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erreur de connexion");
  }
};
