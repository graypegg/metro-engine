import DockerConnection from './system/DockerConnection.js'

export default () => {
  let dc = new DockerConnection();

  dc.getContainers();
}
