import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import InterventionModal from "../../../components/InterventionModal";
import { useAuth } from "@/contexts/AuthContext";
import { getInterventions, Intervention } from "@/services/interventions";

const Home = () => {
  // État pour gérer le modal et l'intervention sélectionnée
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIntervention, setSelectedIntervention] =
    useState<Intervention | null>(null);

  const { token } = useAuth();
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  // const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Exemple de données d'interventions
  // const [interventions, setInterventions] = useState<Intervention[]>([
  //   {
  //     id: 1,
  //     title: "Réparation système électrique",
  //     client: "Entreprise ABC",
  //     address: "15 Rue de la Paix, 75001 Paris",
  //     date: "Aujourd'hui, 14:30",
  //     status: "En attente",
  //     priority: "Élevée",
  //   },
  //   {
  //     id: 2,
  //     title: "Maintenance préventive climatisation",
  //     client: "Société XYZ",
  //     address: "25 Avenue des Champs-Élysées, 75008 Paris",
  //     date: "Demain, 10:00",
  //     status: "En cours",
  //     priority: "Normale",
  //   },
  //   {
  //     id: 3,
  //     title: "Installation système alarme",
  //     client: "Restaurant Le Gourmet",
  //     address: "8 Rue du Commerce, 75015 Paris",
  //     date: "19/06/2023, 09:15",
  //     status: "Terminée",
  //     priority: "Normale",
  //   },
  //   {
  //     id: 4,
  //     title: "Remplacement de tuyauterie",
  //     client: "Hôtel Luxe",
  //     address: "32 Boulevard Haussmann, 75009 Paris",
  //     date: "21/06/2023, 11:00",
  //     status: "En cours",
  //     priority: "Élevée",
  //   },
  //   {
  //     id: 5,
  //     title: "Diagnostic fuite d'eau",
  //     client: "Appartement Privé",
  //     address: "14 Rue des Rosiers, 75004 Paris",
  //     date: "Aujourd'hui, 16:00",
  //     status: "En attente",
  //     priority: "Urgente",
  //   },
  //   {
  //     id: 6,
  //     title: "Mise à jour système de sécurité incendie",
  //     client: "Centre Commercial Horizon",
  //     address: "50 Rue Lafayette, 75010 Paris",
  //     date: "Demain, 09:00",
  //     status: "En attente",
  //     priority: "Normale",
  //   },
  //   {
  //     id: 7,
  //     title: "Inspection panneau solaire",
  //     client: "Maison Résidentielle",
  //     address: "12 Allée des Acacias, 75012 Paris",
  //     date: "22/06/2023, 14:00",
  //     status: "En attente",
  //     priority: "Faible",
  //   },
  //   {
  //     id: 8,
  //     title: "Réglage et entretien chaudière",
  //     client: "Bureau TechCorp",
  //     address: "18 Rue Montorgueil, 75002 Paris",
  //     date: "23/06/2023, 10:30",
  //     status: "En cours",
  //     priority: "Normale",
  //   },
  //   {
  //     id: 9,
  //     title: "Nettoyage conduits d'aération",
  //     client: "Usine MétalPro",
  //     address: "45 Rue des Entrepreneurs, 75020 Paris",
  //     date: "24/06/2023, 15:00",
  //     status: "Terminée",
  //     priority: "Élevée",
  //   },
  //   {
  //     id: 10,
  //     title: "Réparation système de vidéosurveillance",
  //     client: "Banque Nationale",
  //     address: "60 Avenue Victor Hugo, 75016 Paris",
  //     date: "25/06/2023, 09:45",
  //     status: "En attente",
  //     priority: "Urgente",
  //   },
  // ]);

  const fetchInterventions = async () => {
    try {
      if (!token) return;

      const response = await getInterventions(token);
      setInterventions(response.data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la récupération des interventions"
        );
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  // Fonction pour ouvrir le modal avec l'intervention sélectionnée
  const handleOpenModal = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    setModalVisible(true);
  };

  // Fonction pour commencer une intervention
  const handleStartIntervention = () => {
    if (selectedIntervention) {
      // Met à jour le statut de l'intervention
      const updatedInterventions = interventions.map((item) => {
        if (item.id === selectedIntervention.id) {
          return { ...item, status: "En cours" as const };
        }
        return item;
      });

      setInterventions(updatedInterventions);

      // Met à jour l'intervention sélectionnée
      setSelectedIntervention({
        ...selectedIntervention,
        status: "En cours" as const,
      });

      Alert.alert(
        "Intervention commencée",
        "Vous avez commencé l'intervention. N'oubliez pas de compléter le rapport une fois terminé."
      );
    }
  };

  // Fonction pour terminer une intervention
  const handleCompleteIntervention = () => {
    if (selectedIntervention) {
      // Met à jour le statut de l'intervention
      const updatedInterventions = interventions.map((item) => {
        if (item.id === selectedIntervention.id) {
          return { ...item, status: "Terminée" as const };
        }
        return item;
      });

      setInterventions(updatedInterventions);

      // Met à jour l'intervention sélectionnée
      setSelectedIntervention({
        ...selectedIntervention,
        status: "Terminée" as const,
      });

      Alert.alert(
        "Intervention terminée",
        "L'intervention a été marquée comme terminée. Merci pour votre travail!"
      );

      // Ferme le modal après un court délai
      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    }
  };

  useEffect(() => {
    fetchInterventions();
  }, [token]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        {/* En-tête avec bienvenue */}
        <View className="px-4 py-10 bg-blue-500">
          <Text className="text-white text-2xl font-bold mb-1">
            Bonjour, Jean
          </Text>
          <Text className="text-white opacity-80">
            Vous avez{" "}
            {interventions.filter((i) => i.status !== "Terminée").length}{" "}
            interventions à venir
          </Text>
        </View>

        {/* Carte résumé */}
        <View className="mx-4 bg-white rounded-lg shadow-sm p-4 -mt-4">
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="font-bold text-lg text-orange-500">
                {interventions.filter((i) => i.status === "PENDING").length}
              </Text>
              <Text className="text-gray-600 text-xs">En attente</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold text-lg text-blue-500">
                {interventions.filter((i) => i.status === "PENDING").length}
              </Text>
              <Text className="text-gray-600 text-xs">En cours</Text>
            </View>

            <View className="items-center">
              <Text className="font-bold text-lg text-green-500">
                {interventions.filter((i) => i.status === "Terminée").length}
              </Text>
              <Text className="text-gray-600 text-xs">Terminées</Text>
              {/* iny  */}
            </View>
          </View>
        </View>

        {/* Présentation */}
        <View className="p-4">
          <Text className="text-xl font-bold mb-2">
            À propos de l'application
          </Text>
          <Text className="text-gray-600 mb-4">
            Cette application vous permet de gérer vos interventions techniques
            sur le terrain. Consultez vos missions, planifiez votre journée et
            remplissez vos rapports d'intervention.
          </Text>
        </View>

        {/* Liste des interventions */}
        <View className="p-4">
          <Text className="text-xl font-bold mb-4">Vos interventions</Text>

          {interventions.map((intervention) => (
            <TouchableOpacity
              key={intervention.id}
              className="bg-white rounded-lg shadow-sm p-4 mb-3"
              onPress={() => handleOpenModal(intervention)}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-bold text-lg">
                    {intervention.title}
                  </Text>
                  <Text className="text-gray-700">
                    {intervention.client.name}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {intervention.location}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-2">
                    {intervention.startDate}
                  </Text>

                  {/* Statut de l'intervention */}
                  <View className="flex-row items-center mt-2">
                    <View
                      className={`w-3 h-3 rounded-full mr-2 ${
                        intervention.status === "Terminée"
                          ? "bg-green-500"
                          : intervention.status === "En cours"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <Text className="text-sm text-gray-600">
                      {intervention.status}
                    </Text>
                  </View>
                </View>
                <View className="ml-2">
                  {intervention.status === "En attente" ? (
                    <View className="bg-red-100 px-2 py-1 rounded">
                      <Text className="text-red-700 text-xs font-medium">
                        Urgent
                      </Text>
                    </View>
                  ) : (
                    <View className="bg-blue-100 px-2 py-1 rounded">
                      <Text className="text-blue-700 text-xs font-medium">
                        Normal
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <View className="flex-row items-center">
                  <FontAwesome name="map-marker" size={14} color="#9ca3af" />
                  <Text className="text-gray-500 text-xs ml-1">
                    Voir l'itinéraire
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-blue-500 text-xs mr-1">Détails</Text>
                  <FontAwesome name="chevron-right" size={10} color="#3b82f6" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal d'intervention */}
        {selectedIntervention && (
          <InterventionModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            intervention={selectedIntervention}
            onStartIntervention={handleStartIntervention}
            onCompleteIntervention={handleCompleteIntervention}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
