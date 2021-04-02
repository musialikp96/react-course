import { BgColorsOutlined } from "@ant-design/icons"
import { emit, EVENT_TYPE } from "../../pages/GoogleMapMediator"
import HeaderButton from "./HeaderButton"

const StylePickerToggle = () => {
    return (
        <HeaderButton
            onClick={() => emit(EVENT_TYPE.STYLE_TOGGLE_CLICKED)}
            text={<BgColorsOutlined />}
        />
    )
}
export default StylePickerToggle;