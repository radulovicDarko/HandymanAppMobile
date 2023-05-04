import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Plumber, Electrical, Montage, NotFound } from "../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemEventContainer from "../components/ItemEventContainer";
import { getEvents } from "../api";

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("electrical");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getEvents().then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">open jobs</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "YOUR_API_KEY",
            language: "en",
          }}
        />
      </View>

      {/* Menu Container */}
      {isLoading ? (
        <View className=" flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className=" flex-row items-center justify-between px-8 mt-8">
            <ScrollView 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}>
                <MenuContainer
                  key={"electrical"}
                  title="Electrical"
                  imageSrc={Electrical}
                  type={type}
                  setType={setType}
                />

                <MenuContainer
                  key={"plumber"}
                  title="Plumber"
                  imageSrc={Plumber}
                  type={type}
                  setType={setType}
                />

                <MenuContainer
                  key={"montage"}
                  title="Montage"
                  imageSrc={Montage}
                  type={type}
                  setType={setType}
                />
                
                <MenuContainer
                  key={"electrical2"}
                  title="Electrical2"
                  imageSrc={Electrical}
                  type={type}
                  setType={setType}
                />

                <MenuContainer
                  key={"plumber2"}
                  title="Plumber2"
                  imageSrc={Plumber}
                  type={type}
                  setType={setType}
                />

                <MenuContainer
                  key={"montage2"}
                  title="Montage2"
                  imageSrc={Montage}
                  type={type}
                  setType={setType}
                />
            </ScrollView>
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[28px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>

            <View className="px-1 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.data?.length > 0 ? (
                <>
                  {
                    mainData?.data?.map((data, i) => (
                    <ItemEventContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.username}
                      location={data?.password}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-center text-[#428288] font-semibold">
                      There are no jobs for you {'\n'} at the moment
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
