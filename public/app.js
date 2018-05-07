// set canvas id to variable
  var canvas = document.getElementById('draw');
  var socket = io.connect('http://192.168.1.4:4000');
  // get canvas 2D context and set it to the correct size
  var ctx = canvas.getContext('2d');
  resize();

  // resize canvas when window is resized
  function resize() {
    ctx.canvas.width = window.innerWidth-20;
    ctx.canvas.height = window.innerHeight-45;
  }

  // add event listeners to specify when functions should be triggered
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);


  // last known position
  var pos = { x: 0, y: 0 };

  // new position from mouse events
  function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY-30;
  }


  function draw(e) {

    if (e.buttons !== 1) return; // if mouse is pressed.....

    var color = document.getElementById('hex').value;

    ctx.beginPath(); // begin the drawing path

    ctx.lineWidth = 10; // width of line
    ctx.lineCap = 'round'; // rounded end cap
    ctx.strokeStyle = color; // hex color of line

    ctx.moveTo(pos.x, pos.y); // from position
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to position

    ctx.stroke(); // draw it!
    socket.emit('new-draw', canvas.toDataURL());

   }

  socket.on('new-draw', (data) => {
    var img = new Image;
    img.onload = function(){
      ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    img.src = data;
  });



function addDraw(e) {
  var payload = canvas.toDataURL();

  socket.emit('draw', payload);
  return false;
}