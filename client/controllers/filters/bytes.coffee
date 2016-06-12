# -----------------------------------------------------------------------------
# bytes filter
kraken.filter 'bytes', [->
    ( input, precision = 1 ) ->
        if input?
            if input isnt 0
                units  = ['o', 'Ko', 'Mo', 'Go', 'To', 'Po']
                number = Math.floor Math.log( input ) / Math.log( 1024 )

                input = "#{ ( input / Math.pow 1024, Math.floor number ).toFixed precision } #{ units[number] }"
            else
                input = '0 o'

        input
]