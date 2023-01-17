import React from "react";
import { MainContainer, LoadingIcon } from "./PreloadStyles";
import MerchantLogo from "../../assets/logo-merchant-center.svg";

const PreloadView = () => {
  return (
    <MainContainer>
      <MerchantLogo width="100%" height="160" opacity="0.50" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </MainContainer>
  );
};

export default PreloadView;
