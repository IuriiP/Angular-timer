# Angular-timer

This directive build an array of the named objects in the root scope and change it's values (up or down) each 1 sec.
You can use the named object's properties.

Directive (Tag or Class)
---------
**timer** [id] [value] [countdown [onzero]]

Attributes
----------
- **id** *(string, optional)* : scope name of the timer object. Sets to 'timer' if omitted. It's needed if use more then one timer on a page!
- **value** *(integer, optional)* : initial timer value in seconds. Sets to current timestamp if omitted.
- **countdown** *(optional)* : the countdown timer variant if used.
- **onzero** *(ng-expression, optional)* : used for countdown. Eval the expression ONCE on 0 value.

Object properties
-----------------
### for countUp timer (time indicator)

- **fulldate** = full date in string format
- **year** = year (4 digits)
- **month** = current month (2 digits)
- **week** = day of week

### for any timer

- **day** = current/remaining days (2 digits)
- **days** = current/ramaining days (w/o leading zero)
- **hours** = current/remaining hours (2 digits)
- **minutes** = current/remaining minutes (2 digits)
- **seconds** = current/remaining seconds (2 digits)

Watches
-------
- property **timetolive** : reinit current value with new.

