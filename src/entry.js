import DockerConnection from './system/DockerConnection.js'
import Docker from 'dockerode'

export function init () {
  return new DockerConnection( Docker )
}
