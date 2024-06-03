import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Separator, AuthTextInput, PwdInput } from "../components";
import React, {useState,useEffect} from "react";
import { KeyboardAvoidingView, Form, Select, HStack, Heading, FormControl, Input, VStack, Button, Box, Modal, ModalBackdrop, AlertText, Alert, ScrollView } from "native-base";
import { registerUser } from "../src/actions/AuthAction";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
});

const Register = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
      setShowModal(false);
  };
  const toggleModal = () => {
      setShowModal(!showModal);
  };
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
 
  const [username,setUsername] = useState ("");
  const [email,setEmail] = useState ("");
  const [password,setPassword] = useState("");
  const onRegister = async () => {
    if (email && password) {
      const data = {
        email: email,
        username: username,
        status: "user",
      };

      console.log(data);

      try {
        const user = await registerUser(data, password); // Assuming registerUser is a function that you have defined elsewhere
        setModalContent({
          title: "Registrasi Berhasil",
          message: "Registrasi berhasil! Anda dapat login sekarang.",
        });
        toggleModal();
      } catch (error) {
        setModalContent({
          title: "Registrasi Gagal",
          message: "Format email salah atau telah digunakan. Silakan gunakan email lain.",
        });
        toggleModal();
      }
    } else {
      setModalContent({
        title: "Data Tidak Lengkap",
        message: "Data yang dimasukkan tidak lengkap atau password harus minimal 6 karakter.",
      });
      toggleModal();
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            color: "#774494",
            fontSize: 35,
          }}
        >
          Sign Up
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        >
          Create account here
        </Text>
      </View>
      <Box>
        <FormControl>
          <FormControl.Label>Username / Nama</FormControl.Label>
            <Input
            value={username}
            onChangeText={(username) => setUsername(username)}
            placeholder="Enter Your Username"/>
          </FormControl>
          <FormControl.Label>Email</FormControl.Label>
            <Input
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder="Enter Your Email"
            w={"full"}/>
            <FormControl.Label>Password</FormControl.Label>
              <Input
              value={password}
              onChangeText={(password) => setPassword(password)}
              placeholder="Enter Your Password"
              type="password"/>
                {password.length < 6 && (
                  <Text style={{ color: 'red' }}>
                      Passowrd minimal 6 karakter.
                  </Text>
                )}
      </Box>
      <View
        style={{ flex: 1.6, justifyContent: "center", alignItems: "center" }}
      >
        <Button px={10} bg={"#774494"} onPress={() => {
              onRegister();
            }}>Register</Button>
            <Modal isOpen={showModal} onClose={onCloseModal}>
                <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>{modalContent.title}</Modal.Header>
                <Modal.Body>
                    <Text>{modalContent.message}</Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={onCloseModal}>Tutup</Button>
                </Modal.Footer>
                </Modal.Content>
            </Modal>
        <Separator h={15} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              color: "#774494",
              fontSize: 16,
            }}
          >
            Already have account?
          </Text>
          <Separator w={4} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              color: "#774494",
              fontSize: 16,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
