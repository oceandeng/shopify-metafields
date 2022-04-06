import React from 'react'
import { TextField, InlineError } from '@shopify/polaris'
import Throttle from '../../../utilities/Throttle'

class HtmlType extends React.Component {
  constructor(props) {
    super(props)

    this.throttle = new Throttle()
    const htmlString = this.props.data.value

    this.state = {
      htmlString
    }
  }

  handleChange (htmlString) {
    this.setState({ htmlString })
    this.throttle.setTimer(() => {
      this.props.handleValue(htmlString)
    })
  }

  render () {
    const { htmlString } = this.state
    const item = this.props.data

    return (
      <>
        <TextField
          error={item.valueInvalid.isInvalid}
          value={htmlString}
          multiline={8}
          onChange={(htmlString) => { this.handleChange(htmlString) }}></TextField>
        <div className="mt10">
          <InlineError message={item.valueInvalid.errorMessage} />
        </div>

      </>
    )
  }
}

export default HtmlType