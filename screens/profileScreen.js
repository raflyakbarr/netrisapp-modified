import { View, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import { Profile, Separator } from "../components";
import { useNavigation } from "@react-navigation/native";
import { clearStorage, getData } from "../src/utils/localStorage";
import { Heading, Box, HStack, Modal, Flex, VStack, Button} from "native-base";
import FIREBASE from "../src/config/FIREBASE";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const handleLogOut = () => {
    setShowModal(true);
  };
  const [profile, setProfile] = useState(null);

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

  const onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          clearStorage();
          navigation.replace("Splash");
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    } else {
      navigation.replace("Login");
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Profile/>
      </View>
      <Separator h={50} />
      <Button
      bg={"#774494"}
        onPress={handleLogOut}
        full={true}
      >Keluar</Button>
  <Modal isOpen={showModal} onClose={() => setShowModal(false)} motionPreset="slide">
    <Modal.Content maxWidth="400" maxH="400">
      <Modal.CloseButton />
        <Modal.Body>
          <Text fontWeight="bold" fontSize={17}>Anda yakin ingin keluar?</Text>
        </Modal.Body>
        <Box>
        <VStack space={2} alignItems="center">
        <Modal.Footer>
          <Button.Group>
            <Button backgroundColor="#774494" 
              onPress={() => onSubmit(profile)}>
                Ya
            </Button>
            <Button backgroundColor="#774494"
              onPress={() => setShowModal(false)}>
                Tidak
            </Button>
          </Button.Group>
        </Modal.Footer>
        </VStack>
        </Box>
    </Modal.Content>
  </Modal>
    </View>
  );
};

export default ProfileScreen;
