import React from 'react';
import {LabelSlider} from './components';

const difficultyMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
};

export default class App extends React.Component<any, any> {
  onRangeChange = (label: string, values: [number, number]) => {};
  onCountChange = (label: string, count: number) => {};

  render() {
    return (
      <div className="tools">
        <div className="config">
          <div>加法</div>
          <div>
            难度
            <LabelSlider
              label="addLevel"
              defaultValue={[1, 2]}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onRangeChange={this.onRangeChange}
            />
          </div>
          <div>
            数量
            <LabelSlider label="addCount" defaultValue={0} max={50} onValueChange={this.onCountChange} />
          </div>
        </div>
        <div className="config">
          <div>减法</div>
          <div>
            难度
            <LabelSlider
              label="subtractLevel"
              defaultValue={[1, 2]}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onRangeChange={this.onRangeChange}
            />
          </div>
          <div>
            数量
            <LabelSlider label="subtractCount" defaultValue={0} max={50} onValueChange={this.onCountChange} />
          </div>
        </div>
        <div className="config">
          <div>乘法</div>
          <div>
            难度
            <LabelSlider
              label="multiplyLevel"
              defaultValue={[1, 2]}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onRangeChange={this.onRangeChange}
            />
          </div>
          <div>
            数量
            <LabelSlider label="multiplyCount" defaultValue={0} max={50} onValueChange={this.onCountChange} />
          </div>
        </div>
        <div className="config">
          <div>除法</div>
          <div>
            难度
            <LabelSlider
              label="divideLevel"
              defaultValue={[1, 2]}
              min={1}
              max={4}
              step={0.1}
              marks={difficultyMarks}
              onRangeChange={this.onRangeChange}
            />
          </div>
          <div>
            数量
            <LabelSlider label="divideCount" defaultValue={0} max={50} onValueChange={this.onCountChange} />
          </div>
        </div>
      </div>
    );
  }
}
