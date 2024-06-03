import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import { getData } from "../src/utils/localStorage";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  profile: {
    height: 60,
    width: 60,
    justifyContent: "center",
  },
});

const Profile = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const [profile, setProfile] = useState("Belum Login");
  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        setProfile(data);
      } else {
        // navigation.replace('Login');
      }
    });
  };
  return (
    <>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={props.nav}>
          <Image
            style={styles.profile}
            source={require("../assets/pp.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", paddingLeft: 15 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
          }}
        >
          Halo, {profile?.username}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 13,
          }}
        >
          Hati hati dijalan :)
        </Text>
      </View>
    </>
  );
};

export default Profile;
