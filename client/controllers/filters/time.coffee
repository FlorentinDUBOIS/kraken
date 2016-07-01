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

            minutes = seconds / 60
            seconds = seconds % 60

            time += "#{ parseInt minutes }:#{ parseInt seconds }"

        time
]
