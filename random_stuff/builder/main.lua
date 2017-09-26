-- @Author: Debray Arnaud <adebray>
-- @Date:   2017-09-23T21:49:49+02:00
-- @Email:  adebray@student.42.fr
-- @Last modified by:   adebray
-- @Last modified time: 2017-09-23T21:59:03+02:00

local width = 12
local height = 12

function love.load() end
function love.update(dt)
	solve = dofile('./solve.lua')
end
function love.draw()
	local _width = love.graphics.getWidth()
	local _height = love.graphics.getHeight()
	local max = solve(_width, _height)
	for i=0,_width,width do
		for j=0,_height,height do
			local _s = (solve(i, j) / max) * 255
			love.graphics.setColor(_s, _s, _s, 255)
			love.graphics.rectangle('fill', i, j, width, height)
		end
	end
end
