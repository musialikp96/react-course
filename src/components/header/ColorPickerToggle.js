import { EVENT_TYPE, emit } from '../../pages/GoogleMapMediator';
import HeaderButton from './HeaderButton';

const ColorPickerToggle = () => {
    return (
        <HeaderButton
            onClick={() => emit(EVENT_TYPE.COLOR_PICKER_TOGGLE_CLICKED)}
            text={`🎨`}
        />
    )
}
export default ColorPickerToggle;