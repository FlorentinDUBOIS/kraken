# -----------------------------------------------------------------------------
# to lower filter
kraken.filter 'time', [->
    ( seconds ) ->
        time = ""
        if seconds?
            hours   = seconds / 3600
            seconds = seconds % 3600

            if 0 isnt parseInt hours
                time += "#{ parseInt hours }:"

            minutes = parseInt seconds / 60
            seconds = parseInt seconds % 60

            if minutes < 10 and 0 isnt parseInt hours
                minutes = "0#{ minutes }"

            if seconds < 10
                seconds = "0#{ seconds }"

            time += "#{ minutes }:#{ seconds }"

        time
]
