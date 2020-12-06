import React, {ChangeEvent, ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {LabelSwitch, LabelSlider} from './components';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import {shuffle, t} from './util';
import {selectAdd, selectSubtract} from './add';
import debounce from 'lodash/debounce';
import {RadioChangeEvent} from 'antd/lib/radio/interface';
import {selectDivide, selectMultiply} from './multiply';
import {selectFraction} from './fraction';
import {select24} from './24pt';

const isChrome = window.navigator.userAgent.includes('Chrome/');

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
const multiplyMarks = moreMarks([1.1, 1.2, 1.3, 1.5, 2.1, 2.4, 3.5]);

interface Settings {
  addDecimal: boolean;
  addLevel: [number, number];
  addCount: number;
  subtractLevel: [number, number];
  subtractCount: number;
  multiplyDecimal: boolean;
  multiplyLevel: [number, number];
  multiplyCount: number;
  divideLevel: [number, number];
  fractionLevel: number;
  fractionCount: number;
  divideCount: number;
  g24Level: number;
  g24Count: number;
  sort: 'type' | 'random';
  column: number;
  size: number;
  title: string;
}

function loadSettings(): Settings {
  const defaultSettings: Settings = {
    addDecimal: false,
    addLevel: [1, 1.9],
    addCount: 20,
    subtractLevel: [1, 1.9],
    subtractCount: 4,
    multiplyDecimal: false,
    multiplyLevel: [1.1, 1.9],
    multiplyCount: 0,
    divideLevel: [1.1, 1.9],
    divideCount: 0,
    fractionLevel: 1,
    fractionCount: 0,
    g24Level: 2,
    g24Count: 0,
    sort: 'type',
    column: 2,
    size: 28,
    title: '',
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

  problems: React.ReactChild[];
  sortedProblems: React.ReactChild[];

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
      ...shuffle(selectAdd(settings.addLevel, settings.addCount, settings.addDecimal)),
      ...shuffle(selectSubtract(settings.subtractLevel, settings.subtractCount, settings.addDecimal)),
      ...shuffle(selectMultiply(settings.multiplyLevel, settings.multiplyCount, settings.multiplyDecimal)),
      ...shuffle(selectDivide(settings.divideLevel, settings.divideCount, settings.multiplyDecimal)),
      ...selectFraction(settings.fractionLevel, settings.fractionCount),
      ...select24(settings.g24Level, settings.g24Count),
    ];
    this.sortProblems(settings);
  }
  sortProblems(settings: Settings) {
    if (settings.sort === 'random') {
      this.sortedProblems = shuffle(this.problems);
    } else {
      this.sortedProblems = this.problems;
    }
  }

  updatePortal(settings: Settings) {
    let children: React.ReactElement[] = [];
    let key = 0;
    for (let str of this.sortedProblems) {
      children.push(
        <div key={++key} className="problem">
          {str}
        </div>
      );
    }
    let title: React.ReactElement;
    let style = {opacity: 1 - (settings.size - 12) / 200};
    if (settings.title) {
      title = (
        <p className="problems-title" style={{...style, fontSize: Math.round(settings.size * 0.75)}}>
          {settings.title}
        </p>
      );
    }
    this.portal = ReactDOM.createPortal(
      <>
        {title}
        <div
          className={`problems${isChrome ? ' chrome-math' : ''}`}
          style={{...style, fontSize: settings.size, columnCount: settings.column}}
        >
          {children}
        </div>
      </>,
      document.querySelector('#output')
    );
  }

  onValueChange = (label: string, values: any) => {
    this.setState((state: State) => {
      let settings: Settings = {...state.settings, [label]: values};
      switch (label) {
        case 'column':
        case 'size':
        case 'title':
          break;
        case 'sort': {
          this.sortProblems(settings);
          break;
        }
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
  onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.onValueChange('title', e.target.value);
  };
  print = () => {
    if (/micromessenger/i.test(window.navigator.userAgent)) {
      alert('微信浏览器不支持打印，试试用其他浏览器打开');
    }
    print();
  };
  render() {
    let {settings} = this.state;
    return (
      <div className="tools">
        <div className="tools-group">
          <div className="config">
            <div className="config-head">
              <div className="config-icon">+</div>
              {t('Add', '加法')}
              <LabelSwitch
                label="addDecimal"
                settings={settings}
                onValueChange={this.onValueChange}
                checkedChildren={t('decimal', '小数')}
                unCheckedChildren={t('integer', '整数')}
                style={{position: 'absolute', right: 0}}
              />
            </div>
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
            <div className="config-head">
              <div className="config-icon">-</div>
              {t('Subtract', '减法')}
              <LabelSwitch
                label="addDecimal"
                settings={settings}
                onValueChange={this.onValueChange}
                checkedChildren={t('decimal', '小数')}
                unCheckedChildren={t('integer', '整数')}
                style={{position: 'absolute', right: 0}}
              />
            </div>
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
            <div className="config-head">
              <div className="config-icon">×</div>
              {t('Multiply', '乘法')}
              <LabelSwitch
                label="multiplyDecimal"
                settings={settings}
                onValueChange={this.onValueChange}
                checkedChildren={t('decimal', '小数')}
                unCheckedChildren={t('integer', '整数')}
                style={{position: 'absolute', right: 0}}
              />
            </div>
            <div>
              {t('Level', '难度')} : {settings.multiplyLevel.join(' ~ ')}
              <LabelSlider
                label="multiplyLevel"
                range
                settings={settings}
                min={1}
                max={4}
                step={0.1}
                marks={multiplyMarks}
                onValueChange={this.onValueChange}
              />
            </div>
            <div>
              {t('Count', '数量')} : {settings.multiplyCount}
              <LabelSlider label="multiplyCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
          <div className="config">
            <div className="config-head">
              <div className="config-icon">÷</div>
              {t('Divide', '除法')}
              <LabelSwitch
                label="multiplyDecimal"
                settings={settings}
                onValueChange={this.onValueChange}
                checkedChildren={t('decimal', '小数')}
                unCheckedChildren={t('integer', '整数')}
                style={{position: 'absolute', right: 0}}
              />
            </div>
            <div>
              {t('Level', '难度')} : {settings.divideLevel.join(' ~ ')}
              <LabelSlider
                label="divideLevel"
                range
                settings={settings}
                min={1}
                max={4}
                step={0.1}
                marks={multiplyMarks}
                onValueChange={this.onValueChange}
              />
            </div>
            <div>
              {t('Count', '数量')} : {settings.divideCount}
              <LabelSlider label="divideCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
        </div>
        <div className="tools-group">
          <div className="config">
            <div className="config-head">
              <div className="config-icon config-icon-s">½</div>
              {t('fraction', '分数')}
            </div>
            <div>
              {t('Level', '难度')} : {settings.fractionLevel}
              <LabelSlider
                label="fractionLevel"
                settings={settings}
                min={1}
                max={4}
                marks={difficultyMarks}
                onValueChange={this.onValueChange}
              />
            </div>
            <div>
              {t('Count', '数量')} : {settings.fractionCount}
              <LabelSlider label="fractionCount" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
          <div className="config">
            <div className="config-head">
              <div className="config-icon config-icon-s">24</div>
              {t('24 Game', '24点')}
            </div>
            <div>
              {t('Level', '难度')} : {settings.g24Level}
              <LabelSlider
                label="g24Level"
                settings={settings}
                min={1}
                max={4}
                marks={difficultyMarks}
                onValueChange={this.onValueChange}
              />
            </div>
            <div>
              {t('Count', '数量')} : {settings.g24Count}
              <LabelSlider label="g24Count" settings={settings} max={50} onValueChange={this.onValueChange} />
            </div>
          </div>
        </div>
        <div className="tool-row">
          <div className="foot-group witdh100">
            {t('Print Title', '打印标题')} : <Input value={settings.title} onChange={this.onTitleChange} />
          </div>
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
            <Button type="primary" size="large" onClick={this.print}>
              {t('Print', ' 打印')}
            </Button>
          </div>
        </div>
        {this.portal}
      </div>
    );
  }
}
