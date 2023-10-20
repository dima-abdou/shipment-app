import { PropsWithChildren } from 'react';
import { styled } from '@mui/material';

const StyledMain = styled('main')`
  width: 100%;
`;

export const Main = ({ children }: PropsWithChildren<unknown>) => (
  <StyledMain>{children}</StyledMain>
);
