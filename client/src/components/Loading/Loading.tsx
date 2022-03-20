import React from "react";
import {
  Container,
  LoadingContainer,
  LogoSection,
  QuoteSection,
  InfoSection,
  Progress,
  Image,
  Subtitle,
  DividerLine,
} from "./Loading.styles";
import LogoImg from "../../assets/budgety_logo_alt.png";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Container>
      <LoadingContainer>
        {/* <CloseButton>
          <IoMdCloseCircleOutline size="2rem" />
        </CloseButton> */}
        <LogoSection>
          <Image src={LogoImg} alt="logo" />
          <Subtitle>Tips</Subtitle>
        </LogoSection>
        <DividerLine />
        <QuoteSection>
          <h1>
            &quot;Budget for the income you receive, not what you are suppose to
            get.&quot;{" "}
          </h1>
        </QuoteSection>
        <DividerLine />
        <InfoSection>
          <h4>Debt.com</h4>
          <Progress>
            <p style={{ marginBottom: "1em" }}>Loading your content...</p>
            <CircularProgress style={{ color: "#3200c0" }} />
          </Progress>
        </InfoSection>
      </LoadingContainer>
    </Container>
  );
};

export default Loading;
