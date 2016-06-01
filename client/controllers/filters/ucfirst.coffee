# -----------------------------------------------------------------------------
# ucfirst filter
kraken.filter 'ucfirst', [->
    ( input ) ->
        input = "#{ input.charAt( 0 ).toUpperCase() }#{ input.substring 1 }" if input?
        input
]