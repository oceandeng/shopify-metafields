import React from 'react';
import DatePicker from 'react-modern-calendar-datepicker';
import TimePicker from 'rc-time-picker';
import { Stack, Select, TextField, InlineError } from '@shopify/polaris';
import moment from 'moment';
import Throttle from '../../../utilities/Throttle'
class DatePickerType extends React.Component {
  constructor(props) {
    super(props)

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    this.options = [{
      label: 'DD/MM/YYYY',
      value: '1'
    }, {
      label: 'YYYY/MM/DD',
      value: '2'
    }]
    this.selectedDay = !!this.props.data.value ? this.props.data.value.split(' ')[0] : ''

    this.throttle = new Throttle()
    this.selected = /[a-zA-Z]+/g.test(this.selectedDay) ? '1' : '2'
    this.inputDay = this._toStringSelectedDay(this.selected, this.handleGetDefaultDay())

    this.state = {
      inputDay: '',
      selected: '1',
      selectedDay: this.handleGetDefaultDay(),
      time: this.handleGetTime()
    }

  }

  init () {
    this.setState({ inputDay: this.inputDay, selected: this.selected }, () => {
      if (!this.props.data.value) {
        this._handleValue()
      }
    })
  }

  handleGetTime () {
    const time = !!this.props.data.value ? this.props.data.value.split(' ')[1] : '00:00:00'
    const t = time ? time.split(':') : []
    const m = !!t.length ? moment({ h: t[0], m: t[1], s: t[2] }) : ''

    return m
  }

  handleGetDefaultDay () {
    const date = new Date();
    const year = date.getFullYear()
    const month = Number(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    const day = date.getDate()
    let obj =  {
      year,
      month,
      day
    }

    if (!!this.selectedDay) {
      const d = this.selectedDay.split('/')
      if (/[a-zA-Z]+/g.test(this.selectedDay)) {
        obj.year = Number(d[2])
        obj.month = Number(publicTools.leadingDigit(this.months.indexOf(d[1]) * 1 + 1))
        obj.day = Number(d[0])
      } else {
        obj.year = Number(d[0])
        obj.month = Number(publicTools.leadingDigit(d[1]))
        obj.day = Number(d[2])
      }
    }
    return obj
  }

  handleSelectChange (v) {
    const { selectedDay } = this.state
    this.setState({ selected: v }, () => {
      this._formatSelectedDay(selectedDay)
    })
  }

  handleInput (e) {
    const v = e.target.value
    this.setState({ inputDay: v })
  }

  handleSetSelectedDay (day) {
    this._formatSelectedDay(day)
  }

  handleTime (time) {
    if (!!time) {
      time.format('HH:mm:ss');
    }
    this.setState({ time }, () => {
      this._handleValue()
    })
  }

  handleClearTime () {
    this.setState({
      time: undefined
    }, () => {
      this._handleValue()
    })
  }

  _handleValue () {
    const { inputDay, time } = this.state
    const v = !!time ? `${inputDay} ${time.format('HH:mm:ss')}` : `${inputDay}`
    this.throttle.setTimer(() => {
      this.props.handleValue(v)
    })
  }

  _formatSelectedDay (day) {
    if (!day) return
    const { selected } = this.state
    const inputDay = this._toStringSelectedDay(selected, day)


    this.setState({ selectedDay: day, inputDay: inputDay }, () => { this._handleValue() })
  }

  _toStringSelectedDay (selected, day) {
    return selected == '1' ? `${publicTools.leadingDigit(day.day)}/${this.months[day.month - 1]}/${day.year}` : selected == '2' ? `${day.year}/${publicTools.leadingDigit(day.month)}/${publicTools.leadingDigit(day.day)}` : ''
  }

  componentDidUpdate (prevProps, prevState) {
    const { value, type } = this.props.data

    if (!!value && prevProps.data.value != value && type == 'edit') {
      let selected = '1'
      let selectedDay = null
      let selectedDayStr = ''
      if (/[a-zA-Z]+/g.test(value)) {
        selectedDay = this.handleGetDefaultDay()
        selectedDayStr = this._toStringSelectedDay('1', this.state.selectedDay)
      } else {
        selectedDay = this.handleGetDefaultDay()
        selectedDayStr = this._toStringSelectedDay('2', this.state.selectedDay)
      }

      const inputDay = value.split(' ')[0]
      const time = this.handleGetTime()
      const stateValue = `${selectedDayStr} ${this.state.time ? this.state.time.format('HH:mm:ss') : moment()}`
     
      if (value != stateValue) {
        this.setState({ inputDay, selectedDay, selected, time })
      }
    }
  }

  componentDidMount () {
    this.init()
  }

  render () {
    const item = this.props.data
    const { inputDay, selected, selectedDay, time } = this.state

    const renderCustomInput = ({ ref }) => (
      <div className="Polaris-TextField">
        <input
          readOnly
          ref={ref} // necessary
          placeholder="Select a date"
          onChange={(e, v) => this.handleInput(e, v)}
          value={inputDay}
          className="Polaris-TextField__Input" // a styling class
        />
        <div className="Polaris-TextField__Backdrop"></div>
      </div>
    )

    return (
      <>
        <div>{item.selectedName} *</div>
        <div className="mt5">
          {item.selectedLabel}
          <Stack>
            <Stack.Item>
              <Select
                options={this.options}
                onChange={(v) => { this.handleSelectChange(v) }}
                value={selected}
              />
            </Stack.Item>
            <Stack.Item>
              <DatePicker
                value={selectedDay}
                onChange={(day) => { this.handleSetSelectedDay(day) }}
                renderInput={renderCustomInput}
                shouldHighlightWeekends
              />
            </Stack.Item>
            <Stack.Item>
              <TimePicker allowEmpty={false} value={time} onChange={time => this.handleTime(time)} />
            </Stack.Item>
          </Stack>
          <div className="hiddenInput">
            <TextField
              labelHidden
              type="hidden"
              value={inputDay}
              error={item.valueInvalid.isInvalid} />
            <div className="mt10">
              <InlineError message={item.valueInvalid.errorMessage} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DatePickerType