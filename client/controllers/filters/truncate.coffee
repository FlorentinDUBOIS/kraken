# -----------------------------------------------------------------------------
# truncate filter
kraken.filter 'truncate', [->
    ( input, at = 40 ) ->
        input = "#{ input.substring 0, at-3 }..." if input? and at < input.length
        input
]