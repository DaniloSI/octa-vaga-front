import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import '../node_modules/react-grid-layout/css/styles.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import Input from './components/Input';
import Checkbox from './components/Checkbox';


export default function App() {
    const [layout, setLayout] = useState([]);
    const [showBorderItems, setShowBorderItems] = useState(false);
    const [itemDrop, setItemDrop] = useState();
    const [items, setItems] = useState([]);
    const components = [
        <Input />,
        <Checkbox />
    ];

    function changeResizeble(key, isResizable) {
        setLayout((old) => {
            const layoutIndex = old.findIndex(l => l.i === key);
            const newLayout = old.slice();

            newLayout.splice(layoutIndex, 1);
            const result = [
                ...newLayout,
                {
                    ...old[layoutIndex],
                    isResizable,
                }
            ];

            return result;
        });
    }

    function handleMouseEnter(key) {
        changeResizeble(key, true);
        setShowBorderItems(true);
    }

    function handleMouseLeave(key) {
        changeResizeble(key, false);
        setShowBorderItems(false);
    }

    function handleDrop(layout) {
        setLayout(layout.map(l => ({...l, isResizable: false})));
    }
      
    return (
        <div className="page">
            <div className="tools">
                <h1>Components</h1>
                {components.map((component, index) => (
                    <div
                        key={index}
                        className="droppable-element"
                        draggable={true}
                        unselectable="on"
                        onDragStart={e => {
                            e.dataTransfer.setData("text/plain", "");
                            const newItem = {
                                key: uuidv4(),
                                value: component
                            };

                            setItemDrop(newItem);
                            setItems(
                            {
                                ...items,
                                [newItem.key]: newItem.value,
                            });
                        }}
                    >
                        <div className="component-tool">
                            {component}
                        </div>
                    </div>
                ))}
            </div>
            <div className="box">
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={30}
                    width={1200}
                    onLayoutChange={setLayout}
                    isDroppable
                    onDrop={handleDrop}
                    droppingItem={{ i: itemDrop?.key ?? '', w: 3, h: 2 }}
                    compactType={null}
                    isBounded
                    style={{height: '100%', width: '100%'}}
                >
                    {layout.map(l => (
                        <div
                            key={l.i}
                            onMouseEnter={() => handleMouseEnter(l.i)}
                            onMouseLeave={() => handleMouseLeave(l.i)}
                            style={{
                                border: `1px dashed ${l.isResizable || showBorderItems ? 'rgb(232, 232, 232)' : 'transparent'}`
                            }}
                        >
                            {items[l.i]}
                        </div>
                    ))}
                </GridLayout>
            </div>
        </div>
    )
}
