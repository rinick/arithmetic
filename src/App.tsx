import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {LabelSlider} from './components';
import {Button, Radio} from 'antd';
import {shuffle, t} from './util';
import {selectAdd, selectSubtract} from './add';
import debounce from 'lodash/debounce';
import {d} from './problem';
import {RadioChangeEvent} from 'antd/lib/radio/interface';

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
    subtractCount: 4,
    multiplyLevel: [1, 2],
    multiplyCount: 0,
    divideLevel: [1, 2],
    divideCount: 0,
    sort: 'type',
    column: 2,
    size: 28,
  };

  try {
    let localSettings = window.localStorage.getItem('arithmetic-settings');
    return {...defaultSettings, ...JSON.parse(localSettings)};
  } catch (err) {}

  return defaultSettings;
}

interface State {
  settings: Settings;
}

export default class App extends React.PureComponent<any, State> {
  portal: React.ReactPortal;

  problems: string[];

  save = debounce(() => {
    let {settings} = this.state;
    window.localStorage.setItem('arithmetic-settings', JSON.stringify(settings));
  }, 1000);

  constructor(props: any) {
    super(props);
    let settings = loadSettings();
    this.state = {settings};
    this.generateProblems(settings);
    this.updatePortal(settings);
  }

  generateProblems(settings: Settings) {
    this.problems = [
      ...shuffle(selectAdd(settings.addLevel, settings.addCount)),
      ...shuffle(selectSubtract(settings.subtractLevel, settings.subtractCount)),
    ];
  }

  updatePortal(settings: Settings) {
    let sorted = this.problems;
    if (settings.sort === 'random') {
      sorted = shuffle(sorted);
    }
    let children: React.ReactElement[] = [];
    for (let str of sorted) {
      children.push(<div className="problem">{str}</div>);
    }
    this.portal = ReactDOM.createPortal(
      <div
        className="problems"
        style={{columnCount: settings.column, fontSize: settings.size, opacity: 1 - (settings.size - 12) / 200}}
      >
        {children}
      </div>,
      document.querySelector('#output')
    );
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
    this.save();
  };
  onSortChange = (e: RadioChangeEvent) => {
    this.onValueChange('sort', e.target.value);
  };
  render() {
    let {settings} = this.state;
    return (
      <div className="tools">
        <div className="tools-group">
          <div className="config">
            <h3>{t('Add', '加法')}</h3>
            <div>
              {t('Level', '难度')} : {settings.addLevel.join(' ~ ')}
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
              {t('Count', '数量')} : {settings.addCount}
              <LabelSlider label="addCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
          <div className="config">
            <h3>{t('Subtract', '减法')}</h3>
            <div>
              {t('Level', '难度')} : {settings.subtractLevel.join(' ~ ')}
              <LabelSlider
                label="subtractLevel"
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
              {t('Count', '数量')} : {settings.subtractCount}
              <LabelSlider label="subtractCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
        </div>
        <div className="tools-group">
          <div className="config">
            <h3>{t('Multiply', '乘法')}</h3>
            <div>
              {t('Level', '难度')} : {settings.multiplyLevel.join(' ~ ')}
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
              {t('Count', '数量')} : {settings.multiplyCount}
              <LabelSlider label="multiplyCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
          <div className="config">
            <h3>{t('Divide', '除法')}</h3>
            <div>
              {t('Level', '难度')} : {settings.divideLevel.join(' ~ ')}
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
              {t('Count', '数量')} : {settings.divideCount}
              <LabelSlider label="divideCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
        </div>
        <div className="tool-foot">
          <div className="foot-group ">
            {t('Columns', '排版')} : {settings['column']}
            {t('', ' 列')}
            <LabelSlider label="column" settings={settings} min={1} max={10} onValueChange={this.onValueChange} />
          </div>
          <div className="foot-group ">
            {t('Font Size', '字体')} : {settings['size']}px
            <LabelSlider label="size" settings={settings} min={12} max={100} onValueChange={this.onValueChange} />
          </div>
          <div className="spacer" />
          <div className="foot-group ">
            <div className="spacer" />
            <Radio.Group value={settings.sort} onChange={this.onSortChange}>
              <Radio.Button value="type">{t('Grouped', '分类')}</Radio.Button>
              <Radio.Button value="random">{t('Random Order', '打乱')}</Radio.Button>
            </Radio.Group>
            <Button type="primary" size="large" onClick={print}>
              {t('Print', ' 打印')}
            </Button>
          </div>
        </div>
        {this.portal}
      </div>
    );
  }
}
