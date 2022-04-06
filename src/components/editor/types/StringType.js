import React from 'react';
import { TextStyle, TextField, InlineError } from '@shopify/polaris';
import Throttle from '../../../utilities/Throttle'

class StringType extends React.Component {
  constructor(props) {
    super(props)

    this.throttle = new Throttle()

    this.state = {
      value: this.props.data.value
    }
  }

  handleChange (v) {
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
        <TextStyle variation="subdued">This field is restricted to String format only. HTML, URL, Email, Date, JSON String formats are not allowed.</TextStyle>
        <div className="mt5">
          <TextField
            multiline={2}
            error={item.valueInvalid.isInvalid}
            value={value}
            onChange={(v) => { this.handleChange(v) }} />
          <div className="mt10">
            <InlineError message={item.valueInvalid.errorMessage} />
          </div>
        </div>
      </>
    )
  }
}

export default StringType