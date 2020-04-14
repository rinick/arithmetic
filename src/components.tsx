import React from 'react';
import {InputNumber, Slider} from 'antd';
import {SliderProps} from 'antd/lib/slider';

interface LabelSliderProps extends SliderProps {
  label: string;
  onRangeChange?(label: string, values: [number, number]): void;
  onValueChange?(label: string, value: number): void;
}

export class LabelSlider extends React.PureComponent<LabelSliderProps> {
  onChange = (values: number | [number, number]) => {
    let {label, onValueChange, onRangeChange} = this.props;
    if (onRangeChange) {
      onRangeChange(label, values as [number, number]);
    } else if (onValueChange) {
      onValueChange(label, values as number);
    }
  };

  render() {
    let {label, onValueChange, onRangeChange, ...p} = this.props;
    return <Slider {...p} range={onRangeChange != null} onChange={this.onChange} />;
  }
}
