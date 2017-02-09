module.exports = {
  servers: {
    one: {
      host: 'ec2-54-191-186-228.us-west-2.compute.amazonaws.com',
      username: 'ubuntu',
      'pem': './.config/fitfam-meteor.pem',
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'fitfam',
    path: '.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://fitfam.tv',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
