import React from 'react';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

const Loading = styled.div`
  float: right;
  margin-top: -33px;
`

export default ({ loading }) => (
  <Loading>
    <RingLoader
      sizeUnit={"px"}
      size={30}
      color={'#337ab7'}
      loading={loading}
    />
  </Loading>
);
