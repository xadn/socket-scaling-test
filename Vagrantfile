#!/usr/bin/env ruby

PROXY = <<-SH
  apt-get update -yq
  apt-get install -y python-software-properties python g++ make
  add-apt-repository -y ppa:nilya/haproxy-1.5
  apt-get update -yq
  apt-get install -y haproxy
  sed -i "s|ENABLED=0|ENABLED=1|g" /etc/default/haproxy
  mv /etc/haproxy/haproxy.cfg{,.original}
  ln -s /vagrant/proxy/haproxy.cfg /etc/haproxy/haproxy.cfg
SH

WEB = <<-SH
  apt-get update -yq
  apt-get install -y python-software-properties python g++ make
  add-apt-repository -y ppa:chris-lea/node.js
  apt-get update -yq
  apt-get install -y nodejs
  rm -rf /usr/bin/node && ln -s /usr/bin/nodejs /usr/bin/node
  npm install -g nodemon
SH

DB = <<-SH
  apt-get update -yq
  apt-get install redis-server
SH

Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu'

  config.vm.define :proxy do |config|
    config.vm.network :private_network, ip: '10.10.10.10'
    config.vm.provision :shell, inline: 'echo --Preparing PROXY--'
    config.vm.provision :shell, inline: PROXY
  end

  config.vm.define :web1 do |config|
    config.vm.network :private_network, ip: '10.10.10.11'
    config.vm.provision :shell, inline: 'echo --Preparing WEB1--'
    config.vm.provision :shell, inline: WEB
  end

  config.vm.define :web2 do |config|
    config.vm.network :private_network, ip: '10.10.10.12'
    config.vm.provision :shell, inline: 'echo --Preparing WEB2--'
    config.vm.provision :shell, inline: WEB
  end

  config.vm.define :db do |config|
    config.vm.network :private_network, ip: '10.10.10.13'
    config.vm.provision :shell, inline: 'echo --Preparing DB--'
    config.vm.provision :shell, inline: DB
  end

  config.vm.provider :vmware_fusion do |v, override|
    override.vm.box_url = 'http://files.vagrantup.com/precise64_vmware_fusion.box'
  end
end
