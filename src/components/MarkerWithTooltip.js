import { Tooltip } from 'antd';
import Marker from './Marker';

const MarkerWithTooltip = ({ title, ...rest }) => {
    return (
        <Tooltip title={title}>
            <Marker {...rest} />
        </Tooltip>
    )
}

export default MarkerWithTooltip;