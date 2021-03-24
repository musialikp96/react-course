import { Tooltip } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import Marker from './Marker';

const MarkerWithTooltip = ({ title, ...rest }) => {
    const handleClick = () => {
        emit(EVENT_TYPE.MARKER_CLICKED, title);
    }

    return (
        <Tooltip title={title}>
            <Marker {...rest} onClick={handleClick} />
        </Tooltip>
    )
}

export default MarkerWithTooltip;