# -----------------------------------------------------------------------------
# truncate filter
kraken.filter 'truncate', [->
    ( input, at ) ->
        at    = 40 unless at?
        input = "#{ input.substring 0, at-3 }..." if input?
        input
]