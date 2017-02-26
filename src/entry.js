import DockerConnection from './system/DockerConnection.js'
import Docker from 'dockerode'

export default () => {
  let dc = new DockerConnection( Docker )
  return dc.getContainers()
}
