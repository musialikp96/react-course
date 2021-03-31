import styled from 'styled-components';
import { useMapStore } from '../pages/store';

const StyledMarker = styled.div`
  background-color: ${({ state, colors }) => colors[state].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px ${({ state, colors }) => colors[state].shadow};
  opacity: 0.7;
  transition:all .2s ease;
  &:hover {
    opacity:1;
    transform:scale(1.05)
  }
`;

const Marker = (props) => {

  const [{ customMarkerColors }] = useMapStore();

  return (
    <StyledMarker {...props} colors={customMarkerColors} />
  )
}
export default Marker;