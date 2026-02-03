Spring = makeProxy({
  GetModOptions = makeProxy({
    experimentallegionfaction = true,
    experimentalextraunits = false,
    techsplit = false,
    scavunitsforplayers = false,
    forceallunits = false,
  }),
  Utilities = makeProxy({
    Gametype = makeProxy({
      IsScavengers = function()
        return false
      end,
      IsRaptors = function()
        return false
      end,
    })
  })
})
