**Code challenge**

*LABOUR DATA*

A shift will include the pay-rate (per hour), the start and end time, and a text
 field where the manager will enter break info. This may vary depending on the individual manager.

For example:

{
    'break_notes': '15-18',
    'start_time': '10:00',
    'end_time': '23:00',
    'pay_rate': 10.0
}

The data given shows a shift started at 10AM and ended at 11PM. However, the break_notes "15-18" indicates that the staff member took a 3 hour break in the middle of the day (when they would not be paid). The employee was paid £10 per hour.

Given the CSV file data, return the employee's pay rate for the day.

![Screenshot](https://user-images.githubusercontent.com/29276064/59602511-cdc76300-90fe-11e9-857c-49d9b587d586.png)
