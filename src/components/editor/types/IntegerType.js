import React from 'react';
import { TextField, InlineError } from '@shopify/polaris'
import Throttle from '../../../utilities/Throttle'

class IntegerType extends React.Component {
  constructor(props) {
    super(props)

    this.throttle = new Throttle()
    this.state = {
      value: this.props.data.value
    }
  }

  handleChange (v) {
    if (!!v && !/^\d+$/.test(v)) return

    this.setState({ value: v }, () => {
      this.throttle.setTimer(() => {
        this.props.handleValue(v)
      })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.data.value != this.props.data.value) {
      this.setState({
        value: this.props.data.value
      })
    }
  }

  render () {
    const item = this.props.data
    const { value } = this.state

    return (
      <>
        <div>{item.selectedName} *</div>
        <div className="mt5">
          <TextField
            type="number"
            error={item.valueInvalid.isInvalid}
            value={value}
            onChange={(v) => { this.handleChange(v) }}/>
          <div className="mt10">
            <InlineError message={item.valueInvalid.errorMessage} />
          </div>
        </div>
      </>
    )
  }
}

export default IntegerType;