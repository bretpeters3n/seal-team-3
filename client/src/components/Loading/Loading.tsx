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
import { getFinanceTips } from "../../API/FinancialTipMethods";
import { useQuery } from "react-query";
import { IFinanceTip } from "../../constants";

const Loading = () => {
  const fetchTips = async () => {
    const data = await getFinanceTips();
    return data;
  };

  const { data, isFetching } = useQuery<IFinanceTip[]>("tips", fetchTips);

  if (isFetching) {
    return null;
  }

  return (
    <Container>
      <LoadingContainer>
        <LogoSection>
          <Image src={LogoImg} alt="logo" />
          <Subtitle>Tips</Subtitle>
        </LogoSection>
        <DividerLine />
        <QuoteSection>
          {data && (
            <h1>{data[Math.floor(Math.random() * data.length)].title}</h1>
          )}
        </QuoteSection>
        <DividerLine />
        <InfoSection>
          {data && (
            <h4>{data[Math.floor(Math.random() * data.length)].author}</h4>
          )}
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
