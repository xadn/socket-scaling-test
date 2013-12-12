#!/usr/bin/env bash

function restart_proxy() {
  vagrant ssh $1 -c 'sudo service haproxy restart'
}

function restart_web() {
  vagrant ssh $1 -c 'pkill -f node'
  vagrant ssh $1 -c 'nohup nodemon -L /vagrant/web/app.js > /dev/null &'
}

restart_proxy proxy > /dev/null &
# restart_web web1 > /dev/null &
# restart_web web2 > /dev/null &
