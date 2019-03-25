// external js: flickity.pkgd.js

var flkty = new Flickity('.carousel', {
  draggable:false,
  isWrapped:false,
  cellAlign: "left"
});


var caption = document.querySelector('.caption');

flkty.on( 'select', function() {
  // set image caption using img's alt
  caption.textContent = flkty.selectedElement.alt;
});