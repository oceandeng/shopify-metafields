import React from 'react';
import { TextField, InlineError } from '@shopify/polaris';
import ColorPicker from 'rc-color-picker';
import Throttle from '../../../utilities/Throttle'

class ColorPickerType extends React.Component {
  constructor(props) {
    super(props)

    this.throttle = new Throttle()

    this.state = {
      color: !!this.props.data.value ? this.props.data.value : '#f00'
    }
  }

  handleChange (v) {
    this.setState({ color: v.color })
    this.throttle.setTimer(() => {
      this.props.handleValue(v.color)
    })
  }

  componentDidUpdate (prevProps, prevState){
    if(prevProps.data.value != this.props.data.value){
      this.setState({color: this.props.data.value})
    }
  }

  componentDidMount () {
    const { color } = this.state
    this.props.handleValue(color)
  }

  render () {
    const { selectedName, value, valueInvalid } = this.props.data
    const { color } = this.state

    return (
      <>
        <div>{selectedName} *</div>
        <div className="mt5">
          <ColorPicker
            color={color}
            mode={"RGB"}
            align={{
              points: ['tl', 'tr'],
              offset: [10, 0]
            }}
            enableAlpha={false}
            onChange={(v) => { this.handleChange(v) }} >
            <span className='rc-color-picker-trigger size-30w' ></span>
          </ColorPicker>
          <div className="hiddenInput">
            <TextField
              labelHidden
              type="hidden"
              value={value}
              error={valueInvalid.isInvalid} />
            <div className="mt10">
              <InlineError message={valueInvalid.errorMessage} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ColorPickerType