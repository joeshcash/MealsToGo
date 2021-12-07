import styled from "styled-components/native";
import { StatusBar, SafeAreaView } from "react-native";

const TransparentSafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
`;

export default TransparentSafeArea;
