# -*- mode: ruby -*-
# vi: set ft=ruby :

BOX_NAME = 'ubuntu'
VF_BOX_URI = 'http://files.vagrantup.com/precise64_vmware_fusion.box'
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = BOX_NAME

  # config.vm.define :proxy do |config|
  #   config.vm.network :private_network, ip: '10.10.10.10'
  #   config.vm.provision :shell, inline: <<-SH
  #     echo "--Preparing PROXY--"
  #     apt-get update -yq
  #     apt-get install -y haproxy
  #   SH
  # end

  config.vm.define :web do |config|
    config.vm.network :private_network, ip: '10.10.10.11'
    config.vm.provision :shell, inline: <<-SH
      echo "--Preparing WEB--"
      apt-get update -yq
      apt-get install -y python-software-properties python g++ make
      add-apt-repository -y ppa:chris-lea/node.js
      apt-get update -yq
      apt-get install -y nodejs
      rm -rf /usr/bin/node && ln -s /usr/bin/nodejs /usr/bin/node
      npm install -g nodemon
      cd /vagrant/web
      npm install
      nodemon app.js
    SH
  end

  config.vm.define :db do |config|
    config.vm.network :private_network, ip: '10.10.10.12'
    config.vm.provision :shell, inline: <<-SH
      echo "--Preparing DB--"
    SH
  end

  config.vm.provider :vmware_fusion do |v, override|
    override.vm.box_url = VF_BOX_URI
    # v.vmx["memsize"] = '1536'
    # v.vmx["numvcpus"] = '2'
  end
end
