require("util")
require("VFS_polyfill")
require("Spring_polyfill")

VFS.Include('common/tablefunctions.lua')


local function loadUnitDefs()
  local dir = "../bar-repo/units"
  local result = {}

  -- macOS / Linux
  local files = getCmdOutput(string.format(
    "find %q -type f -name '*.lua'",
    dir
  ))

  table.sort(files) -- deterministic load order 👍

  for _, path in ipairs(files) do
    local chunk, err = loadfile(path)
    if not chunk then
      error("Failed to load " .. path .. ": " .. err)
    end

    local data = chunk()
    if type(data) ~= "table" then
      error(path .. " did not return a table")
    end

    table.mergeInPlace(result, data)
  end

  return result
end

local json = require("dkjson")


-- local units = VFS.Include("luaui/configs/unit_buildmenu_config.lua")
-- local grid = VFS.Include("luaui/configs/gridmenu_config.lua")

UnitDefs = loadUnitDefs()
local unitDefsJson = json.encode(UnitDefs, { indent = true })

local file = io.open("../src/bar/unit_defs.json", "w")
file:write(unitDefsJson)
file:close()




local gridmenuLayouts = VFS.Include("luaui/configs/gridmenu_layouts.lua")
local gridmenuLayoutsJson = json.encode(gridmenuLayouts, { indent = true })

local file = io.open("../src/bar/gridmenu_layouts.json", "w")
file:write(gridmenuLayoutsJson)
file:close()
