import styled from 'styled-components';

const Marker = styled.div`
  background-color: #ff7e23e0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px #ffa769;
  opacity: 0.7;
  transition:all .2s ease;
  &:hover {
    opacity:1;
    transform:scale(1.05)
  }
`;

export default Marker;