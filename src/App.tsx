import React from 'react';
import {LabelSlider} from './components';
import {Button, Radio} from 'antd';
import {Pool} from './problem';

const difficultyMarks = {
  1: '1',
  1.5: '',
  2: '2',
  2.5: '',
  3: '3',
  3.5: '',
  4: '4',
};

interface Settings {
  addLevel: [number, number];
  addCount: number;
  subtractLevel: [number, number];
  subtractCount: number;
  multiplyLevel: [number, number];
  multiplyCount: number;
  divideLevel: [number, number];
  divideCount: number;
  sort: 'all' | 'type' | 'none';
  column: number;
}

function loadSettings(): Settings {
  const defaultSettings: Settings = {
    addLevel: [1, 2],
    addCount: 20,
    subtractLevel: [1, 2],
    subtractCount: 0,
    multiplyLevel: [1, 2],
    multiplyCount: 0,
    divideLevel: [1, 2],
    divideCount: 0,
    sort: 'all',
    column: 1,
  };
  return defaultSettings;
}

interface State {
  settings: Settings;
}

export default class App extends React.Component<any, State> {
  state = {settings: loadSettings()};

  onValueChange = (label: string, values: any) => {
    this.setState((state: State) => {
      return {settings: {...state.settings, [label]: values}};
    });
  };

  render() {
    let {settings} = this.state;
    return (
      <div className="tools">
        <div className="config">
          <h4>加法</h4>
          <div>
            难度 : {settings.addLevel.join(' ~ ')}
            <LabelSlider
              label="addLevel"
              range
              settings={settings}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onValueChange={this.onValueChange}
            />
          </div>
          <div>
            数量 : {settings.addCount}
            <LabelSlider label="addCount" settings={settings} max={50} onValueChange={this.onValueChange} />
          </div>
        </div>
        <div className="config">
          <h4>减法</h4>
          <div>
            难度 : {settings.subtractLevel.join(' ~ ')}
            <LabelSlider
              label="subtractLevel"
              range
              settings={settings}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onValueChange={this.onValueChange}
            />
          </div>
          <div>
            数量 : {settings.subtractCount}
            <LabelSlider label="subtractCount" settings={settings} max={50} onValueChange={this.onValueChange} />
          </div>
        </div>
        <div className="config">
          <h4>乘法</h4>
          <div>
            难度 : {settings.multiplyLevel.join(' ~ ')}
            <LabelSlider
              label="multiplyLevel"
              range
              settings={settings}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onValueChange={this.onValueChange}
            />
          </div>
          <div>
            数量 : {settings.multiplyCount}
            <LabelSlider label="multiplyCount" settings={settings} max={50} onValueChange={this.onValueChange} />
          </div>
        </div>
        <div className="config">
          <h4>除法</h4>
          <div>
            难度 : {settings.divideLevel.join(' ~ ')}
            <LabelSlider
              label="divideLevel"
              range
              settings={settings}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onValueChange={this.onValueChange}
            />
          </div>
          <div>
            数量 : {settings.divideCount}
            <LabelSlider label="divideCount" settings={settings} max={50} onValueChange={this.onValueChange} />
          </div>
        </div>
        <div className="tool-foot">
          排序 :
          <Radio.Group value={settings.sort}>
            <Radio.Button value="all">顺序</Radio.Button>
            <Radio.Button value="type">只打乱难度</Radio.Button>
            <Radio.Button value="none">完全打乱</Radio.Button>
          </Radio.Group>
          排版 : {settings['column']}列
          <LabelSlider label="column" settings={settings} min={1} max={10} onValueChange={this.onValueChange} />
          <div className="spacer" />
          <Button type="primary" size="large">
            打印
          </Button>
        </div>
      </div>
    );
  }
}
