import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {LabelSlider} from './components';
import {Button, Radio} from 'antd';
import {Pool} from './problem';
import {shuffle} from './util';
import {selectAdd} from './add';

const difficultyMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
};

function moreMarks(values: number[]) {
  let marks: any = {...difficultyMarks};
  for (let value of values) {
    marks[value] = '';
  }
  return marks;
}

const addMarks = moreMarks([1.5, 2.1, 2.4, 2.6, 3.4, 3.7]);

interface Settings {
  addLevel: [number, number];
  addCount: number;
  subtractLevel: [number, number];
  subtractCount: number;
  multiplyLevel: [number, number];
  multiplyCount: number;
  divideLevel: [number, number];
  divideCount: number;
  sort: 'type' | 'random';
  column: number;
  size: number;
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
    sort: 'type',
    column: 2,
    size: 28,
  };
  return defaultSettings;
}

interface State {
  settings: Settings;
}

export default class App extends React.PureComponent<any, State> {
  portal: React.ReactPortal;

  problems: string[];

  constructor(props: any) {
    super(props);
    let settings = loadSettings();
    this.state = {settings};
    this.generateProblems(settings);
    this.updatePortal(settings, false);
  }

  generateProblems(settings: Settings) {
    this.problems = shuffle(selectAdd(settings.addLevel, settings.addCount));
  }

  updatePortal(settings: Settings, update = true) {
    let sorted = this.problems;
    if (settings.sort === 'random') {
      sorted = shuffle(sorted);
    }
    let children: React.ReactElement[] = [];
    for (let str of sorted) {
      children.push(<div className="problem">{str}</div>);
    }
    this.portal = ReactDOM.createPortal(
      <div className="problems" style={{columnCount: settings.column, fontSize: settings.size}}>
        {children}
      </div>,
      document.querySelector('#output')
    );
    if (update) {
      this.forceUpdate();
    }
  }

  onValueChange = (label: string, values: any) => {
    this.setState((state: State) => {
      let settings: Settings = {...state.settings, [label]: values};
      switch (label) {
        case 'sort':
        case 'column':
        case 'size':
          break;
        default:
          this.generateProblems(settings);
      }
      this.updatePortal(settings);

      return {settings};
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
              marks={addMarks}
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
          <Radio.Group value={settings.sort}>
            <Radio.Button value="type">顺序</Radio.Button>
            <Radio.Button value="random">打乱</Radio.Button>
          </Radio.Group>
          排版 : {settings['column']}列
          <LabelSlider label="column" settings={settings} min={1} max={10} onValueChange={this.onValueChange} />
          字体 : {settings['size']}px
          <LabelSlider label="size" settings={settings} min={12} max={100} onValueChange={this.onValueChange} />
          <div className="spacer" />
          <Button type="primary" size="large">
            打印
          </Button>
        </div>
        {this.portal}
      </div>
    );
  }
}
