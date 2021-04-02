import { Drawer } from 'antd';
import { CirclePicker } from 'react-color';
import { useMapStore } from '../pages/store';
import ArticlesDatabase, { ARTICLE_STATE } from '../services/ArticlesDatabase';
import Title from 'antd/lib/typography/Title';

export default function ColorPicker() {

    const [{ colorDrawerVisible, customMarkerColors }, { setColorDrawerVisible, setColor: setColorToStore }] = useMapStore();

    const onClose = () => {
        setColorDrawerVisible(false);
    };

    const setColor = (color, state) => {
        setColorToStore(color, state)
        ArticlesDatabase.setColor(color, state)
    }

    return (
        <Drawer
            title="Marker's colors"
            placement="left"
            closable={false}
            onClose={onClose}
            visible={colorDrawerVisible}
            maskStyle={{ opacity: 0 }}
        >
            <Title level={4} style={{ marginTop: 20 }}>Default</Title>
            <CirclePicker
                circleSize={25}
                color={customMarkerColors.DEFAULT.background}
                onChangeComplete={(c) => setColor(c.hex, ARTICLE_STATE.DEFAULT)}
            />

            <Title level={4} style={{ marginTop: 20 }}>Read</Title>
            <CirclePicker
                circleSize={25}
                color={customMarkerColors.READ.background}
                onChangeComplete={(c) => setColor(c.hex, ARTICLE_STATE.READ)}
            />

            <Title level={4} style={{ marginTop: 20 }}>Visited</Title>
            <CirclePicker
                circleSize={25}
                color={customMarkerColors.VISITED.background}
                onChangeComplete={(c) => setColor(c.hex, ARTICLE_STATE.VISITED)}
            />
        </Drawer>
    )
}
