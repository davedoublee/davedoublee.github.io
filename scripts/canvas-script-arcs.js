{
  let canvas = document.querySelector('#About-Canvas');
  let context = canvas.getContext( '2d' );
  
  const minimumCanvasHeight = 900
  const isCanvasInPage = () => document.querySelector('#About-Canvas').getBoundingClientRect().top < window.innerHeight
  
  setupCanvasSize(canvas, minimumCanvasHeight)
  


  const nCircles = 8
  let centerX = CANVAS_WIDTH - (CANVAS_WIDTH - 900) / 2 - 100
  let centerY = 350

  let mouseX = 500
  let mouseY = 500
  let currentXPercentFromCenter = 0.5
  let currentYPercentFromCenter = 0.5
  let mouseXPercentFromCenterTarget = 0.5
  let mouseYPercentFromCenterTarget = 0.5

  window.addEventListener( 'resize', () => {
    setupCanvasSize(canvas, minimumCanvasHeight)
    centerX = CANVAS_WIDTH - (CANVAS_WIDTH - 900) / 2 - 100
  })
  document.addEventListener('mousemove', function(evt) {
    const rect = canvas.getBoundingClientRect()
    mouseX = evt.pageX
    mouseY = evt.pageY
    if (mouseY > canvas.height)
        mousey = canvas.height
    mouseXPercentFromCenterTarget = getPercentXFromCenter(mouseX)
    mouseYPercentFromCenterTarget = getPercentYFromCenter(mouseY)
  });


  function update() {
    context.beginPath()
    context.strokeStyle = '#66666633'
    context.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < nCircles; i++) {
      const radius = i * 125 + 20
      const localCenterX = centerX + (i * 20) * mouseXPercentFromCenterTarget
      const localCenterY = centerY + (i * 20) * mouseYPercentFromCenterTarget
      context.moveTo(localCenterX + radius, localCenterY);
      context.arc(localCenterX, localCenterY, radius, 0, 2 * Math.PI)  // 0 and 2 * Math.PI are standard paramters for circles
    }
    context.stroke()
  }

  setInterval(update, 50)
}







//   let time = 0.2,
//       velocity = 0.02,
//       velocityTarget = 0.01,
//       width,
//       height,
//       lastX,
//       lastY;

//   let FOV = 500;
//   let SPACING = 3;
//   let POINTS = 120;
//   let PEAK = FOV * 0.5;
//   let POINTS_PER_LAP = 4;
//   let SHADOW_STRENGTH = 6;


//   setup();

//   function setup() {

//     resize();
//     setInterval(() => {
//       step();
//     }, 33)

//     window.addEventListener( 'resize', resize );
//     window.addEventListener( 'mousemove', onMouseDown );
//     document.addEventListener( 'touchstart', onTouchStart );

//   }

//   function resize() {

//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;

//   }

//   function step() {
//     // requestAnimationFrame( step );
//     if (isCanvasInPage() == false)  // To optimize the page a little bit
//       return;

//     console.log('CANVA')

//     time += velocity;
//     velocity += ( velocityTarget - velocity ) * 0.3;
//     if (velocity > 0.1) velocity = 0.1
//     if (velocity < -0.1) velocity = -0.1

//     clear();
//     render();


//   }

//   function clear() {

//     context.clearRect( 0, 0, width, height );

//   }

//   function render() {

//     let x, y,
//         cx = width/2,
//         cy = height/2;

//     context.globalCompositeOperation = 'lighter';
//     context.strokeStyle = '#444';
//     context.shadowColor = '#444';
//     context.lineWidth = 1;
//     context.beginPath();

//     for( let i = POINTS; i > 15; i -- ) {

//       let value = i * SPACING + ( time % SPACING );

//       let ax = Math.sin( value/POINTS_PER_LAP ) * Math.PI,
//           ay = Math.cos( value/POINTS_PER_LAP ) * Math.PI;

//       x = ax * value + 320,
//       y = ay * value * 0.35;

//       let o = 1 - ( Math.min( value, PEAK ) / PEAK );

//       y -= Math.pow( o, 2 ) * 200;
//       y += 200 * value / FOV;
//       y += x / cx * width * 0.1;

//       context.globalAlpha = 1 - ( value / FOV ) - 0.4;
//       context.shadowBlur = SHADOW_STRENGTH * o;

//       context.lineTo( cx + x, cy + y );
//       context.stroke();

//       context.beginPath();
//       context.moveTo( cx + x, cy + y );

//     }

//   //   context.lineTo( cx, cy - 200 );
//   //   context.lineTo( cx, 0 );
//   //   context.stroke();

//   }

//   function onMouseDown( event ) {

//     lastX = event.clientX;
//     lastY = event.clientY;

//     document.addEventListener( 'mousemove', onMouseMove );
//     document.addEventListener( 'mouseup', onMouseUp );

//   }

//   function onMouseMove( event ) {

//     let vx = ( event.clientX - lastX ) / 100;
//     let vy = ( event.clientY - lastY ) / 100;

//     if( event.clientY < height/2 ) vx *= -1;
//     if( event.clientX > width/2 ) vy *= -1;

//     velocityTarget = vx + vy;

//     lastX = event.clientX;
//     lastY = event.clientY;

//   }

//   function onMouseUp( event ) {

//     document.removeEventListener( 'mousemove', onMouseMove );
//     document.removeEventListener( 'mouseup', onMouseUp );

//   }

//   function onTouchStart( event ) {

//     event.preventDefault();

//     lastX = event.touches[0].clientX;
//     lastY = event.touches[0].clientY;

//     document.addEventListener( 'touchmove', onTouchMove );
//     document.addEventListener( 'touchend', onTouchEnd );

//   }

//   function onTouchMove( event ) {

//     let vx = ( event.touches[0].clientX - lastX ) / 100;
//     let vy = ( event.touches[0].clientY - lastY ) / 100;

//     if( event.touches[0].clientY < height/2 ) vx *= -1;
//     if( event.touches[0].clientX > width/2 ) vy *= -1;

//     velocityTarget = vx + vy;

//     lastX = event.touches[0].clientX;
//     lastY = event.touches[0].clientY;

//   }

//   function onTouchEnd( event ) {

//     document.removeEventListener( 'touchmove', onTouchMove );
//     document.removeEventListener( 'touchend', onTouchEnd );

//   }
// }