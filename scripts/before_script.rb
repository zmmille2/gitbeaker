#!/usr/bin/env ruby

u = User.first
u.admin = true
u.save!

t = PersonalAccessToken.new({ user: u, name: "gitbeaker", scopes: ["api", "read_user"]})

t.set_token(ENV["PERSONAL_ACCESS_TOKEN"])
t.save!

puts t.token
