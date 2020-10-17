import React from 'react';
import Slider, {SliderProps} from 'antd/lib/slider';
import Switch, {SwitchProps} from 'antd/lib/switch';

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

interface LabelSwitchProps extends SwitchProps {
  label: string;
  settings: any;
  onValueChange?(label: string, value: any): void;
}

export class LabelSwitch extends React.PureComponent<LabelSwitchProps> {
  onChange = (value: boolean) => {
    let {label, onValueChange} = this.props;
    if (onValueChange) {
      onValueChange(label, value);
    }
  };

  render() {
    let {label, settings, onValueChange, ...p} = this.props;
    return <Switch {...p} checked={settings[label]} onChange={this.onChange} />;
  }
}
