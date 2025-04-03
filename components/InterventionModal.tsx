import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Intervention } from "@/services/interventions";

// export interface Intervention {
//   id: number;
//   title: string;
//   client: string;
//   address: string;
//   date: string;
//   status: "En attente" | "En cours" | "Planifiée" | "Terminée";
//   priority: "Normale" | "Élevée" | "Urgente" | "Faible";
// }

interface InterventionModalProps {
  visible: boolean;
  onClose: () => void;
  intervention: Intervention;
  onStartIntervention: () => void;
  onCompleteIntervention: () => void;
}

const InterventionModal = ({
  visible,
  onClose,
  intervention,
  onStartIntervention,
  onCompleteIntervention,
}: InterventionModalProps) => {
  const [activeTab, setActiveTab] = useState("before");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const renderBeforeIntervention = () => {
    return (
      <View className=" px-5 pt-4 pb-24">
        {intervention.status == "PENDING" ? (
          <View>
            <Text className="text-lg font-semibold mb-4">
              Avant intervention
            </Text>

            <View className="bg-blue-50 p-4 rounded-lg mb-4">
              <Text className="text-gray-700 mb-2">
                <FontAwesome name="info-circle" size={16} color="#3b82f6" />{" "}
                Instructions
              </Text>
              <Text className="text-gray-600">
                Prenez des photos de l'état initial et notez vos observations
                avant de commencer l'intervention.
              </Text>
            </View>

            <Text className="font-medium text-gray-700 mb-2">
              Description avant intervention
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-lg p-3 mb-4 bg-white h-28"
              placeholder="Entrez vos observations initiales..."
              placeholderTextColor={"#ddd"}
              value={notes}
              onChangeText={setNotes}
            />

            <Text className="font-medium text-gray-700 mb-2">
              Photos avant intervention
            </Text>
            <View className="flex-row flex-wrap mb-4">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <View
                    key={index}
                    className="w-24 h-24 m-1 bg-gray-200 rounded-md overflow-hidden"
                  >
                    <Image source={{ uri: image }} className="w-full h-full" />
                  </View>
                ))
              ) : (
                <View className="w-24 h-24 m-1 bg-gray-200 rounded-md items-center justify-center">
                  <FontAwesome name="camera" size={24} color="#9ca3af" />
                  <Text className="text-xs text-gray-500 mt-1">
                    Ajouter photo
                  </Text>
                </View>
              )}
              <TouchableOpacity className="w-24 h-24 m-1 border-2 border-dashed border-gray-300 rounded-md items-center justify-center">
                <FontAwesome name="plus" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <Text className="font-medium text-gray-700 mb-2">
              Conclusion avant intervention
            </Text>
            <TextInput
              multiline={true} // Permet d'écrire sur plusieurs lignes
              numberOfLines={4} // Définit la hauteur approximative
              className="border border-gray-300 rounded-lg p-3 mb-4 bg-white h-28"
              placeholder="Entrez vos observations initiales..."
              placeholderTextColor={"#ddd"}
              value={notes}
              onChangeText={setNotes}
            />

            <TouchableOpacity
              className="bg-green-500 py-4 rounded-lg items-center mt-4"
              onPress={onStartIntervention}
            >
              <Text className="text-white font-bold text-lg">
                Commencer l'intervention
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="items-center justify-center p-4 ">
            <Text className="text-gray-500 text-center">
              Vous avez deja commencer cette intervention
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderAfterIntervention = () => {
    return (
      <View className="px-5 pt-4 pb-24">
        <Text className="text-lg font-semibold mb-4">Après intervention</Text>

        {intervention.status === "En cours" ? (
          <>
            <View className="bg-blue-50 p-4 rounded-lg mb-4">
              <Text className="text-gray-700 mb-2">
                <FontAwesome name="info-circle" size={16} color="#3b82f6" />{" "}
                Rapport final
              </Text>
              <Text className="text-gray-600">
                Documentez le travail effectué, prenez des photos de l'état
                final et complétez votre rapport.
              </Text>
            </View>

            <Text className="font-medium text-gray-700 mb-2">
              Travaux réalisés
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-lg p-3 mb-4 bg-white h-28"
              placeholder="Décrivez les travaux réalisés..."
            />

            <Text className="font-medium text-gray-700 mb-2">
              Photos après intervention
            </Text>
            <View className="flex-row flex-wrap mb-4">
              <TouchableOpacity className="w-24 h-24 m-1 border-2 border-dashed border-gray-300 rounded-md items-center justify-center">
                <FontAwesome name="plus" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <Text className="font-medium text-gray-700 mb-2">
              Conclusion après travaux réalisés
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-lg p-3 mb-4 bg-white h-28"
              placeholder="Décrivez les travaux réalisés..."
            />

            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-lg items-center mt-4"
              onPress={onCompleteIntervention}
            >
              <Text className="text-white font-bold text-lg">
                Terminer l'intervention
              </Text>
            </TouchableOpacity>
          </>
        ) : intervention.status === "Terminée" ? (
          <View className="items-center justify-center p-4">
            <View className="bg-green-100 w-16 h-16 rounded-full items-center justify-center mb-4">
              <FontAwesome name="check" size={32} color="#10b981" />
            </View>
            <Text className="text-lg text-gray-700 text-center">
              Cette intervention a été complétée
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Rapport final disponible
            </Text>
          </View>
        ) : (
          <View className="items-center justify-center p-4">
            <Text className="text-gray-500 text-center">
              Vous pourrez compléter cette section après avoir commencé
              l'intervention
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill}>
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl h-[90%]">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <View>
                <Text className="text-xl font-bold">{intervention?.title}</Text>
                <Text className="text-gray-600">
                  {intervention?.client.name}
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} className="p-2">
                <FontAwesome name="times" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Info Card */}
            <View className="p-4 bg-blue-50 mx-4 mt-4 rounded-lg">
              <View className="flex-col gap-2 mb-2">
                <View className="flex-row items-center mr-4">
                  <FontAwesome name="clock-o" size={16} color="#3b82f6" />
                  <Text className="text-gray-700 ml-2">
                    {intervention?.startDate}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="map-marker" size={16} color="#3b82f6" />
                  <Text className="text-gray-700 ml-2" numberOfLines={1}>
                    {intervention?.location}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <FontAwesome name="tag" size={16} color="#3b82f6" />
                  <Text className="text-gray-700 ml-2">
                    Statut:{" "}
                    <Text
                      className={`font-semibold ${
                        intervention?.status === "Terminée"
                          ? "text-green-600"
                          : intervention?.status === "En cours"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    >
                      {intervention?.status}
                    </Text>
                  </Text>
                </View>

                <View className="flex-row gap-2 items-center">
                  <FontAwesome name="map-marker" size={16} color="#3b82f6" />
                  <View>
                    <TouchableOpacity>
                      <Text className="text-blue-600 font-semibold">
                        Voir itineraire
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Tabs */}
            <View className="flex-row border-b border-gray-200 mx-4 mt-4">
              <TouchableOpacity
                className={`py-3 px-4 ${
                  activeTab === "before" ? "border-b-2 border-blue-500" : ""
                }`}
                onPress={() => setActiveTab("before")}
              >
                <Text
                  className={`${
                    activeTab === "before"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  Avant intervention
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-3 px-4 ${
                  activeTab === "after" ? "border-b-2 border-blue-500" : ""
                }`}
                onPress={() => setActiveTab("after")}
              >
                <Text
                  className={`${
                    activeTab === "after"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  Après intervention
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView>
              {activeTab === "before"
                ? renderBeforeIntervention()
                : renderAfterIntervention()}
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default InterventionModal;
