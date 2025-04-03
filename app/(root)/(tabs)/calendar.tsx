import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterventionCalendar from "../../../components/InterventionCalendar";
import InterventionModal, {
  Intervention,
} from "../../../components/InterventionModal";

const CalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIntervention, setSelectedIntervention] =
    useState<Intervention | null>(null);

  // Exemple de données d'interventions (à remplacer par vos données réelles)
  const interventions: Intervention[] = [
    {
      id: 1,
      title: "Réparation système électrique",
      client: "Entreprise ABC",
      address: "15 Rue de la Paix, 75001 Paris",
      date: "29/03/2025",
      status: "En attente",
      priority: "Élevée",
    },
    {
      id: 2,
      title: "Maintenance préventive climatisation",
      client: "Société XYZ",
      address: "25 Avenue des Champs-Élysées, 75008 Paris",
      date: "29/03/2025",
      status: "En cours",
      priority: "Normale",
    },
    {
      id: 3,
      title: "Installation système alarme",
      client: "Restaurant Le Gourmet",
      address: "8 Rue du Commerce, 75015 Paris",
      date: "19/06/2023, 09:15",
      status: "Terminée",
      priority: "Normale",
    },
    {
      id: 4,
      title: "Remplacement de tuyauterie",
      client: "Hôtel Luxe",
      address: "32 Boulevard Haussmann, 75009 Paris",
      date: "29/03/2025",
      status: "En cours",
      priority: "Élevée",
    },
    {
      id: 5,
      title: "Diagnostic fuite d'eau",
      client: "Appartement Privé",
      address: "14 Rue des Rosiers, 75004 Paris",
      date: "Aujourd'hui, 16:00",
      status: "En attente",
      priority: "Urgente",
    },
    {
      id: 6,
      title: "Mise à jour système de sécurité incendie",
      client: "Centre Commercial Horizon",
      address: "50 Rue Lafayette, 75010 Paris",
      date: "23/06/2023, 11:00, 09:00",
      status: "En attente",
      priority: "Normale",
    },
    {
      id: 7,
      title: "Inspection panneau solaire",
      client: "Maison Résidentielle",
      address: "12 Allée des Acacias, 75012 Paris",
      date: "22/06/2023, 14:00",
      status: "En attente",
      priority: "Faible",
    },
    {
      id: 8,
      title: "Réglage et entretien chaudière",
      client: "Bureau TechCorp",
      address: "18 Rue Montorgueil, 75002 Paris",
      date: "23/06/2023, 10:30",
      status: "En cours",
      priority: "Normale",
    },
    {
      id: 9,
      title: "Nettoyage conduits d'aération",
      client: "Usine MétalPro",
      address: "45 Rue des Entrepreneurs, 75020 Paris",
      date: "24/06/2023, 15:00",
      status: "Terminée",
      priority: "Élevée",
    },
    {
      id: 10,
      title: "Réparation système de vidéosurveillance",
      client: "Banque Nationale",
      address: "60 Avenue Victor Hugo, 75016 Paris",
      date: "25/06/2023, 09:45",
      status: "En attente",
      priority: "Urgente",
    },
  ];

  const handleSelectIntervention = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    setModalVisible(true);
  };

  const handleStartIntervention = () => {
    if (selectedIntervention) {
      // Mettre à jour le statut de l'intervention
      setSelectedIntervention({
        ...selectedIntervention,
        status: "En cours" as const,
      });
    }
  };

  const handleCompleteIntervention = () => {
    if (selectedIntervention) {
      // Mettre à jour le statut de l'intervention
      setSelectedIntervention({
        ...selectedIntervention,
        status: "Terminée" as const,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className=" px-4 py-4">
        <Text className="text-xl font-bold text-blue-500">
          Calendrier des intervention
        </Text>
      </View>
      <InterventionCalendar
        interventions={interventions}
        onSelectIntervention={handleSelectIntervention}
      />

      {selectedIntervention && (
        <InterventionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          intervention={selectedIntervention}
          onStartIntervention={handleStartIntervention}
          onCompleteIntervention={handleCompleteIntervention}
        />
      )}
    </SafeAreaView>
  );
};

export default CalendarScreen;
