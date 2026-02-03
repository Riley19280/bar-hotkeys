if not VFS then
  VFS = {}
end

if not VFS.Include then
  function VFS.Include(path, env)
    local chunk, err = loadfile('../bar-repo' .. '/' .. path)
    if not chunk then
      error("VFS.Include failed: " .. err)
    end

    if env then
      setfenv(chunk, setmetatable(env, { __index = _G }))
    end

    return chunk()
  end
end
