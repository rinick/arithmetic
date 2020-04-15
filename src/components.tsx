import React from 'react';
import {InputNumber, Slider} from 'antd';
import {SliderProps} from 'antd/lib/slider';

interface LabelSliderProps extends SliderProps {
  label: string;
  settings: any;
  onValueChange?(label: string, value: any): void;
}

export class LabelSlider extends React.PureComponent<LabelSliderProps> {
  onChange = (value: number | [number, number]) => {
    let {label, onValueChange} = this.props;
    if (onValueChange) {
      onValueChange(label, value);
    }
  };

  render() {
    let {label, settings, onValueChange, ...p} = this.props;
    return <Slider {...p} value={settings[label]} onChange={this.onChange} />;
  }
}
