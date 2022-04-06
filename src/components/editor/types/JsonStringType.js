import React from 'react';
import { TextField, InlineError } from '@shopify/polaris';
import Throttle from '../../../utilities/Throttle'

class JsonStringType extends React.Component {
  constructor(props) {
    super(props)

    this.throttle = new Throttle()

    this.state = {
      value: this.props.data.value || ''
    }
  }

  handleValue (v) {
    this.setState({ value: v })
    this.throttle.setTimer(() => {
      this.props.handleValue(v)
    })
  }

  render () {
    const item = this.props.data
    const { value } = this.state

    return (
      <>
        <div>{item.selectedName} *</div>
        <div className="mt5">
          <TextField
            multiline={2}
            error={item.valueInvalid.isInvalid}
            value={value}
            onChange={(v) => this.handleValue(v)} />
          <div className="mt10">
            <InlineError message={item.valueInvalid.errorMessage} />
          </div>
        </div>
      </>
    )
  }
}

export default JsonStringType