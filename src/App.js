import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import '../node_modules/react-grid-layout/css/styles.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import Input from './components/Input';
import Checkbox from './components/Checkbox';
import Button from './components/Button';

import { MdClear } from "react-icons/md";


export default function App() {
    const [layout, setLayout] = useState([]);
    const [showBorderItems, setShowBorderItems] = useState(false);
    const [itemDrop, setItemDrop] = useState();
    const [items, setItems] = useState([]);
    const componentsToolbox = [
        { heightDefault: 3, component: <Input /> },
        { heightDefault: 6, component: <Checkbox /> },
        { heightDefault: 3, component: <Button /> },
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

    function handleDragStart(e, value) {
        e.dataTransfer.setData("text/plain", "");
        const newItem = {
            key: uuidv4(),
            value
        };

        setItemDrop(newItem);
        setItems(
        {
            ...items,
            [newItem.key]: newItem.value,
        });
    }

    function handleDeleteComponent(layout) {
        setLayout(old => old.filter(l => l !== layout));
    }
      
    return (
        <div className="page">
            <div className="tools">
                <div className="tools-content">
                    <h1>Toolbox</h1>
                    {componentsToolbox.map((componentToolbox, index) => (
                        <div
                            key={index}
                            className="droppable-element"
                            draggable={true}
                            unselectable="on"
                            onDragStart={e => handleDragStart(e , componentToolbox)}
                        >
                            <div className="component-tool">
                                {componentToolbox.component}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="box">
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={20}
                    width={1200}
                    onLayoutChange={setLayout}
                    isDroppable
                    onDrop={handleDrop}
                    droppingItem={{ i: itemDrop?.key ?? '', w: 3, h: itemDrop?.value.heightDefault ?? 2 }}
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
                                border: `1px dashed ${showBorderItems ? 'rgb(232, 232, 232)' : 'transparent'}`
                            }}
                        >
                            {showBorderItems && (
                                <div className="delete-component" onClick={() => handleDeleteComponent(l)}>
                                    <MdClear color="grey" title="Delete" />
                                </div>
                            )}
                            <div className="component-box">
                                {items[l.i].component}
                            </div>
                        </div>
                    ))}
                </GridLayout>
            </div>
        </div>
    )
}
