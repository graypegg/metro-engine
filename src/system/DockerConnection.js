import MetroContainer from './MetroContainer'

class DockerConnection {
  constructor ( Docker ) {
    this.dc = new Docker()
  }

  /**
   * getContainers - Returns a list of all currently running MetroContainers
   *
   * @return {array} An array of MetroContainers
   */
  getContainers () {
    return new Promise ((resolve, reject) => {
      this.dc.listContainers(( err, containers ) => {

        if (err) reject(err)
        else {
          resolve(
            containers.filter(( container ) => {
              return true
            }).map( (c) => new MetroContainer(this.dc, c) )
          )
        }

      })
    })
  }

  /**
   * getContainer - Returns a MetroContainer matching the type param
   *
   * @param {string} type MetroContainer type
   *
   * @return {MetroContainer} The requested MetroContainer, or null if not found
   */
  getContainer ( type ) {
    return this.getContainers.filter(( container ) => {
      return container
    })
  }
}

export default DockerConnection
