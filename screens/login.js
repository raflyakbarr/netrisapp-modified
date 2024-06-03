import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Separator, Button, AuthTextInput, PwdInput } from "../components";
import React, {useState,useEffect} from "react";
import { FormControl, Input, VStack, Modal, ScrollView,} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { loginUser } from "../src/actions/AuthAction";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
});

const Login = () => {
  const navigation = useNavigation();
  const [email,setEmail] = useState ("");
  const [password,setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const tombolDaftar = () => {
      navigation.navigate("Register")
  }
  const login = () => {
      if (!email || !password) {
            toggleModal();
          }
        loginUser(email, password)
          .then((user) => {
            navigation.replace("HomeTab");
          })
          .catch((error) => {
            console.log("Error", error.message);
            toggleModal();
          });
    };
  const toggleModal = () => {
      setShowModal(!showModal);
  };
  const onCloseModal = () => {
      setShowModal(false);
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
          Login
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        >
          Enter your account to continue
        </Text>
      </View>
      <View
        style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}
      >
        <AuthTextInput value={email} onChangeText={(text) => setEmail(text)} label={"Email"} ph={"Enter your email"} />
        <Separator h={20} />
        <PwdInput value={password} onChangeText={(text) => setPassword(text)} label={"Password"} />
        <Separator h={20} />
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Button
          left={false}
          text={"Login"}
          op={() => login()}
          
        />
        <Separator h={15} />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "#774494",
          }}
        >
          Or
        </Text>
        <Separator h={15} />
        <Button left={true} text={"Continue with Google"} iconName={"google"} />
        <Separator h={20} />
        <Button
          left={true}
          text={"Continue with Facebook"}
          iconName={"facebook-square"}
        />
      </View>
      <Modal isOpen={showModal} onClose={onCloseModal} avoidKeyboard>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Login Gagal</Modal.Header>
          <Modal.Body>
            <Text>Email atau Password yang anda masukan salah!</Text>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default Login;
