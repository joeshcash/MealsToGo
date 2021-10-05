import styled from "styled-components/native";
import { StatusBar, SafeAreaView } from "react-native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
`;

export default SafeArea;
