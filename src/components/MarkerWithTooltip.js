import { Tooltip } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import Marker from './Marker';

const MarkerWithTooltip = ({ title, state, ...rest }) => {
    const handleClick = () => {
        emit(EVENT_TYPE.MARKER_CLICKED, title);
    }

    return (
        <Tooltip title={title}>
            <Marker {...rest} onClick={handleClick} state={state} />
        </Tooltip>
    )
}

MarkerWithTooltip.defaultProps = {
    state: 'DEFAULT'
}
export default MarkerWithTooltip;