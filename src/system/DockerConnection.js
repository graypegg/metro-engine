let Docker = require('dockerode')

class DockerConnection {
  constructor () {
    this.d = new Docker()
  }

  getContainers ( d ) {
    this.d.listContainers((err, containers) => {
      console.log(containers)
    })
  }
}

export default DockerConnection;
