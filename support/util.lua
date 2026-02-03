function makeProxy(overrides)
  overrides = overrides or {}
  local proxy
  proxy = setmetatable({}, {
    __index = function(_, k)
      if overrides[k] ~= nil then
        return overrides[k]
      else
        return proxy  -- return proxy for anything not set
      end
    end,
    __call = function() return proxy end,
    __tostring = function() return "1" end,
    __add = function() return proxy end,
    __sub = function() return proxy end,
    __mul = function() return proxy end,
    __div = function() return proxy end,
    __unm = function() return proxy end,
    __concat = function() return proxy end,
    __len = function() return 1 end,
    __eq = function() return false end,
    __lt = function() return false end,
    __le = function() return false end,
  })
  return proxy
end

function getCmdOutput(cmd)
  local p = assert(io.popen(cmd))
  local t = {}
  for line in p:lines() do
    t[#t + 1] = line
  end
  p:close()
  return t
end
