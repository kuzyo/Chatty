import React from "react";
import styled from "styled-components";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const FullPageLoading: React.FC = () => {
  return (
    <StyledBackdrop open={true}>
      <CircularProgress />
    </StyledBackdrop>
  );
};

const Loading: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="inherit" />
    </Box>
  );
};

const StyledBackdrop = styled(Backdrop)`
  && {
    background-color: ${({ theme }) => theme.palette.background.default};

    svg {
      color: ${({ theme }) => theme.palette.info.main};
    }
  }
`;

export { FullPageLoading, Loading };
