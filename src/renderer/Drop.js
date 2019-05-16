document.addEventListener('dragover', event => {
  event.preventDefault()
})

document.addEventListener('drop', event => {
  console.debug('drop event', event)
  event.preventDefault()
  Array.prototype.forEach.call(event.dataTransfer.items, item => {
    console.debug('dropped item', item)
    if (item.kind === 'string') {
      item.getAsString(data => world.add(data))
    } else if (item.kind === 'file') {
      const file = item.getAsFile()
      console.debug('dropped file', file)
      const fileReader = new FileReader()
      fileReader.onload = event => world.add(event.target.result, file.name)
      fileReader.readAsText(file)
    }
      //if (object != null) { scene1.remove(object) }
      //if (mesh != null) { scene1.remove(mesh) }
      //object = loader.parse(jsoncontent);
      //object.scale.multiplyScalar(SCALE);
      //scene.add(object);
      //objects.push(object);
      //render();
      //animate();
    //})
  })
})
