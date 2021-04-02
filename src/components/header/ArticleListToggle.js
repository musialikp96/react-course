import { UnorderedListOutlined } from "@ant-design/icons"
import { emit, EVENT_TYPE } from "../../pages/GoogleMapMediator"
import HeaderButton from "./HeaderButton"

const ArticleListToggle = () => {
    return (
        <HeaderButton
            onClick={() => emit(EVENT_TYPE.DRAWER_TOGGLE_CLICKED)}
            text={<UnorderedListOutlined />}
        />
    )
}
export default ArticleListToggle;