import $ from 'jquery'
import registerPlugin from './register-plugin'

class BirthdayDatepicker {
  constructor(element, options) {
    this.$element = $(element)

    this.defaults = {
      maxAge: 120,
      minAge: 18,
    }

    this.$day = $(element).find('.birthday--day select')
    this.$month = $(element).find('.birthday--month select')
    this.$year = $(element).find('.birthday--year select')
    this.$input = $(element).find('input')

    this.day = ''
    this.month = ''
    this.year = ''

    this.options = $.extend({}, this.defaults, options)

    this.init()
  }

  init() {
    this.generateOptions()

    this.$day.on('change', () => this.handleChange('day'))
    this.$month.on('change', () => this.handleChange('month'))
    this.$year.on('change', () => this.handleChange('year'))
  }

  generateOptions() {
    // Days:
    for (let x = 1; x <= 31; x++) {
      $('<option />').text(x).appendTo(this.$day)
    }

    // Years:
    const currentYear = new Date().getFullYear()

    for (let x = (currentYear - this.options.minAge); x >= (currentYear - this.options.minAge - this.options.maxAge); x--) {
      $('<option />').text(x).appendTo(this.$year)
    }
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  handleChange(type) {
    this.day = this.$day.val()
    this.month = this.$month.val()
    this.year = this.$year.val()

    if (this.day !== '' && this.month !== '' && this.year !== '') {
      this.$input.val(`${this.year}-${this.addLeadingZero(this.month)}-${this.addLeadingZero(this.day)}`)
    }

    if ((type === 'month' || type === 'year') && this.month !== '') {
      let days = 30
      let x

      if (this.year !== '') {
        days = this.daysInMonth(this.month, this.year)
      } else {
        if (this.month % 2 === 1) days = 31
        if (this.month === 2) days = 29
      }

      this.$day.html('')

      for (x = 1; x <= days; x++) {
        $('<option />').text(x).appendTo(this.$day)
      }

      this.$day.val(this.day)
    }
  }

  addLeadingZero(num) {
    return (num < 10) ? `0${num}` : num
  }

}

// Plugin definition
registerPlugin('datepicker-birthday', BirthdayDatepicker)

// Copyright AXA Versicherungen AG 2015
