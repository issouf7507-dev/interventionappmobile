import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { FontAwesome } from "@expo/vector-icons";
import { Intervention } from "./InterventionModal";

interface InterventionCalendarProps {
  interventions: Intervention[];
  onSelectIntervention: (intervention: Intervention) => void;
}

const InterventionCalendar = ({
  interventions,
  onSelectIntervention,
}: InterventionCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Fonction pour convertir une date française en format YYYY-MM-DD
  const formatFrenchDate = (dateStr: string): string => {
    if (dateStr === "Aujourd'hui") {
      return new Date().toISOString().split("T")[0];
    }
    if (dateStr === "Demain") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    }

    // Pour le format "DD/MM/YYYY"
    const [day, month, year] = dateStr.split("/");
    if (day && month && year) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    // Si la date n'est pas dans un format attendu, retourner la date d'aujourd'hui
    return new Date().toISOString().split("T")[0];
  };

  // Convertir les interventions en format pour le calendrier
  const markedDates = interventions.reduce((acc, intervention) => {
    const date = intervention.date.split(",")[0].trim();
    const formattedDate = formatFrenchDate(date);

    // Définir la couleur en fonction du statut
    let color = "#3b82f6"; // bleu par défaut
    if (intervention.status === "Terminée") color = "#10b981"; // vert
    if (intervention.status === "En cours") color = "#f59e0b"; // orange
    if (intervention.status === "En attente") color = "#3b82f6"; // bleu

    // Créer ou mettre à jour l'entrée pour cette date
    acc[formattedDate] = {
      marked: true,
      dotColor: color,
      selected: selectedDate === formattedDate,
    };

    return acc;
  }, {} as { [key: string]: any });

  // Filtrer les interventions pour la date sélectionnée
  const getInterventionsForDate = (date: string) => {
    return interventions.filter((intervention) => {
      const interventionDate = intervention.date.split(",")[0].trim();
      const formattedDate = formatFrenchDate(interventionDate);
      return formattedDate === date;
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Calendar
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...markedDates[selectedDate],
            selected: true,
          },
        }}
        theme={{
          selectedDayBackgroundColor: "#3b82f6",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#3b82f6",
          dayTextColor: isDark ? "#e5e7eb" : "#2d3748",
          textDisabledColor: isDark ? "#4b5563" : "#d1d5db",
          dotColor: "#3b82f6",
          monthTextColor: isDark ? "#e5e7eb" : "#1f2937",
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
        }}
      />

      {/* Liste des interventions pour la date sélectionnée */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedDate ? (
          <View className="flex-1 px-4 py-2">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Interventions du{" "}
              {new Date(selectedDate).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>

            {getInterventionsForDate(selectedDate).map((intervention) => (
              <TouchableOpacity
                key={intervention.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-2"
                onPress={() => onSelectIntervention(intervention)}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="font-bold text-lg text-gray-900 dark:text-white">
                      {intervention.title}
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300">
                      {intervention.client}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400 text-sm">
                      {intervention.address}
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
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {intervention.status}
                      </Text>
                    </View>
                  </View>
                  <View className="ml-2">
                    {intervention.priority === "Élevée" ? (
                      <View className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                        <Text className="text-red-700 dark:text-red-300 text-xs font-medium">
                          Urgent
                        </Text>
                      </View>
                    ) : (
                      <View className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                        <Text className="text-blue-700 dark:text-blue-300 text-xs font-medium">
                          Normal
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <View className="flex-row items-center">
                    <FontAwesome
                      name="map-marker"
                      size={14}
                      color={isDark ? "#6b7280" : "#9ca3af"}
                    />
                    <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                      Voir l'itinéraire
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-blue-500 dark:text-blue-400 text-xs mr-1">
                      Détails
                    </Text>
                    <FontAwesome
                      name="chevron-right"
                      size={10}
                      color={isDark ? "#60a5fa" : "#3b82f6"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {getInterventionsForDate(selectedDate).length === 0 && (
              <View className="h-80 items-center justify-center py-8">
                <FontAwesome
                  name="calendar-o"
                  size={48}
                  color={isDark ? "#6b7280" : "#9ca3af"}
                />
                <Text className="text-gray-500 dark:text-gray-400 mt-2">
                  Aucune intervention prévue
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className="h-80 flex items-center justify-center">
            <FontAwesome
              name="calendar-o"
              size={48}
              color={isDark ? "#6b7280" : "#9ca3af"}
            />
            <Text className="text-gray-500 dark:text-gray-400 mt-2">
              Selectionnez une date pour voir
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default InterventionCalendar;
