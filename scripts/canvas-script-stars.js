{
    
    let canvas = document.querySelector('#Hero-Canvas')

    setupCanvasSize(canvas)

    addEventListener( 'resize', () => {
        setupCanvasSize(canvas)
        stars = []
        init()
    })

    let mouseX = 500
    let mouseY = 500
    let currentXPercentFromCenter = 0.5
    let currentYPercentFromCenter = 0.5
    let mouseXPercentFromCenterTarget = 0.5
    let mouseYPercentFromCenterTarget = 0.5
    let n_stars = CANVAS_WIDTH / 15
    let colors = [ '#176ab6', '#fb9b39']
    for ( let i = 0; i < 98; i++) {
        colors.push( '#fff')
    }

    canvas.style.background = '#000'
    let c = canvas.getContext('2d')

    const randomInt = (max, min) => Math.floor( Math.random() * (max - min) + min)

    let bg = c.createRadialGradient( canvas.width/ 2, CANVAS_HEIGHT * 3, CANVAS_HEIGHT ,canvas.width/ 2, CANVAS_HEIGHT , CANVAS_HEIGHT * 4);
    bg.addColorStop(0,"#32465E");
    bg.addColorStop(.4,"#000814");
    bg.addColorStop(.8,"#252934");
    bg.addColorStop(1,"#000");


    class Star {
    constructor( x, y, radius, color) {
        this.x = x || randomInt( 0, canvas.width)
        this.y = y || randomInt( 0, CANVAS_HEIGHT)
        this.radius = radius || Math.random() * 1.1     /* Between 0.2 and 1.1 */
        this.color = color || colors[randomInt(0, colors.length)]
        this.dy = -Math.random() * .3

        this.baseX = this.x
        this.baseY = this.y
        this.currentYOffset = this.y

        this.maxOffset = this.radius * 50
    }
    draw () {
        c.beginPath()
        c.arc( this.x, this.y, this.radius, 0, Math.PI *2 )
        c.shadowBlur = randomInt( 3, 15)
        c.shadowColor = this.color
        c.strokeStyle = this.color
        c.fillStyle = 'rgba( 255, 255, 255, .5)'
        c.fill()
        c.stroke()
        c.closePath()
    }
    update( arrayStars = [] ) {
        if (this.y - this.radius < 0)
            this.createNewStar(arrayStars)
        
        this.currentYOffset += this.dy
        // this.y += this.dy
        this.y = this.baseY + this.currentYOffset + currentYPercentFromCenter * this.maxOffset
        this.x = this.baseX + currentXPercentFromCenter * this.maxOffset
        this.draw()
    }
    createNewStar( arrayStars = [] ) {
        let i = arrayStars.indexOf( this )
        arrayStars.splice( i, 1)
        arrayStars.push( new Star(false, CANVAS_HEIGHT + 5))
    }
    }
    let stars = []
    function init() {
    for( let i = 0; i < n_stars; i++ ) {
        stars.push(new Star())
    }
    }
    init()

    function animate() {
        requestAnimationFrame(animate)
        if (window.pageYOffset >= CANVAS_HEIGHT + 75)  // To optimize the page a little bit
            return;
        c.clearRect(0, 0, canvas.width, CANVAS_HEIGHT)
        c.fillStyle = bg
        c.fillRect(0, 0, canvas.width, CANVAS_HEIGHT)
        stars.forEach( s => s.update( stars ))
    }

    document.addEventListener('mousemove', function(evt) {
        const rect = canvas.getBoundingClientRect()
        mouseX = evt.pageX
        mouseY = evt.pageY + window.scrollY
        if (mouseY > canvas.height)
            mousey = canvas.height
        mouseXPercentFromCenterTarget = getPercentXFromCenter(mouseX)
        mouseYPercentFromCenterTarget = getPercentYFromCenter(mouseY)
    });

    setInterval(() => {
        if (currentXPercentFromCenter < mouseXPercentFromCenterTarget) {
            currentXPercentFromCenter += (mouseXPercentFromCenterTarget - currentXPercentFromCenter) * 0.1
        } else if (currentXPercentFromCenter > mouseXPercentFromCenterTarget) {
            currentXPercentFromCenter += (mouseXPercentFromCenterTarget - currentXPercentFromCenter) * 0.1
        }
        if (currentYPercentFromCenter < mouseYPercentFromCenterTarget) {
            currentYPercentFromCenter += (mouseYPercentFromCenterTarget - currentYPercentFromCenter) * 0.1
        } else if (currentYPercentFromCenter > mouseYPercentFromCenterTarget) {
            currentYPercentFromCenter += (mouseYPercentFromCenterTarget - currentYPercentFromCenter) * 0.1
        }
    }, 10)



    animate()
}